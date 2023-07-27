//Função de Adição de Itens
function addItem() {
  const produtoInput = document.getElementById("produto");
  const valorInput = document.getElementById("valor");
  const itemList = document.getElementById("itemList");

  const nomeProduto = produtoInput.value;
  const valorProduto = parseFloat(valorInput.value);

  if (!nomeProduto || isNaN(valorProduto)) {
    alert("Preencha o nome do produto e o valor corretamente.");
    return;
  }

  const item = document.createElement("div");
  item.classList.add("item");

  const nomeSpan = document.createElement("span");
  nomeSpan.textContent = nomeProduto;
  item.appendChild(nomeSpan);

  const valorSpan = document.createElement("span");
  valorSpan.textContent = ` R$ ${valorProduto.toFixed(2)}`;
  item.appendChild(valorSpan);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", function () {
    itemList.removeChild(item);
    updateTotal();
    saveItemsToLocalStorage(); // Salvando os itens atualizados após a remoção de um item
  });
  item.appendChild(removeButton);

  itemList.appendChild(item);

  produtoInput.value = "";
  valorInput.value = "";

  updateTotal();
  saveItemsToLocalStorage(); // Salvando os itens atualizados após a adição de um item
}

function saveItemsToLocalStorage() {
  const itemList = document.getElementById("itemList");
  const items = itemList.getElementsByClassName("item");
  const savedItems = [];

  for (let i = 0; i < items.length; i++) {
    const nomeSpan = items[i].getElementsByTagName("span")[0];
    const valorSpan = items[i].getElementsByTagName("span")[1];

    const nomeProduto = nomeSpan.textContent;
    const valorProduto = parseFloat(valorSpan.textContent.replace(" R$ ", ""));

    savedItems.push({ nome: nomeProduto, valor: valorProduto });
  }

  localStorage.setItem("items", JSON.stringify(savedItems));
}

function loadItemsFromLocalStorage() {
  const itemList = document.getElementById("itemList");
  const savedItems = JSON.parse(localStorage.getItem("items"));

  if (savedItems && savedItems.length > 0) {
    for (const savedItem of savedItems) {
      const item = document.createElement("div");
      item.classList.add("item");

      const nomeSpan = document.createElement("span");
      nomeSpan.textContent = savedItem.nome;
      item.appendChild(nomeSpan);

      const valorSpan = document.createElement("span");
      valorSpan.textContent = ` R$ ${savedItem.valor.toFixed(2)}`;
      item.appendChild(valorSpan);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remover";
      removeButton.classList.add("remove");
      removeButton.addEventListener("click", function () {
        itemList.removeChild(item);
        updateTotal();
        saveItemsToLocalStorage(); // Salvando os itens atualizados após a remoção de um item
      });
      item.appendChild(removeButton);

      itemList.appendChild(item);
    }
  }

  updateTotal();
}

function updateTotal() {
  const itemList = document.getElementById("itemList");
  const items = itemList.getElementsByClassName("item");
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    const valorSpan = items[i].getElementsByTagName("span")[1];
    const valor = parseFloat(valorSpan.textContent.replace("R$ ", ""));
    total += valor;
  }

  const totalValueSpan = document.getElementById("totalValue");
  totalValueSpan.textContent = `R$ ${total.toFixed(2)}`;
}

// Evento de clique no botão "Adicionar"
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addItem);

// Evento de pressionar Enter nos inputs
const produtoInput = document.getElementById("produto");
const valorInput = document.getElementById("valor");
produtoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});
valorInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});

// Evento de busca nos itens da lista
// Só funciona se tiver mais de um item
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const filterValue = searchInput.value.toLowerCase();
  const items = document.getElementsByClassName("item");

  for (let i = 0; i < items.length; i++) {
    const nomeSpan = items[i].getElementsByTagName("span")[0];
    const nomeProduto = nomeSpan.textContent.toLowerCase();

    if (nomeProduto.includes(filterValue)) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
});

// Carregar itens do Local Storage quando a página é carregada
loadItemsFromLocalStorage();
