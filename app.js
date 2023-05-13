
const itemList = document.getElementById("itemList");
const itemName = document.getElementById("itemName");
const itemDescription = document.getElementById("itemDescription");
const itemPrice = document.getElementById("itemPrice");
const itemQuantity = document.getElementById("itemQuantity");

let items = [];

function addItem(event) {
  event.preventDefault();

  const item = {
    name: itemName.value,
    description: itemDescription.value,
    price: itemPrice.value,
    quantity: itemQuantity.value,
  };

  
  axios
    .post(
      "https://crudcrud.com/api/69761a7d5026476bae08d4d7178a8055/storeData",
      item
    )
    .then(() => {
      
      itemName.value = "";
      itemDescription.value = "";
      itemPrice.value = "";
      itemQuantity.value = "";

      // Refresh item list after adding new item
      displayItems();
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayItems() {
 
  axios
    .get(
      "https://crudcrud.com/api/69761a7d5026476bae08d4d7178a8055/storeData"
    )
    .then((response) => {
      const items = response.data;

      itemList.innerHTML = "";

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const li = document.createElement("li");
        li.textContent = ` ${item.name}  ${item.description}  ${item.price} ${item.quantity}`;

        itemList.appendChild(li);
      }

    
      localStorage.setItem("items", JSON.stringify(items));
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateItem(itemId, itemQuantity) {
  
  axios
    .put(
      `https://crudcrud.com/api/69761a7d5026476bae08d4d7178a8055/storeData/${itemId}`,
      { quantity: itemQuantity }
    )
    .then(() => {
      // Update the item quantity in the items array
      for (let i = 0; i < items.length; i++) {
        if (items[i]._id === itemId) {
          items[i].quantity = itemQuantity;
          break;
        }
      }

    
      displayItems();
    })
    .catch((err) => {
      console.log(err);
    });
}


window.onload = function () {
  const storedItems = JSON.parse(localStorage.getItem("items"));
  if (storedItems) {
    items = storedItems;
    displayItems();
  } else {
   
    displayItems();
  }
};
