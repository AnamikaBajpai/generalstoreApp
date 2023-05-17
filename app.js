
const itemList = document.getElementById('itemList');
const itemForm = document.getElementById('itemForm');

let items = [] ;

function addItem(event) {
    event.preventDefault();

   const itemName = document.getElementById('itemName').value;
   const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;


    const item = {

        name: itemName,
        description: itemDescription,
        price: itemPrice,
        quantity: itemQuantity
    };

    axios.post("https://crudcrud.com/api/c22c17587d604c87982abe322adbddbc/storeData" , item)
    .then(() => {
        itemForm.reset();
        displayItems();
    })
    .catch((err) => {
        console.log(err)
    });
}

function displayItems() {
    axios.get("https://crudcrud.com/api/c22c17587d604c87982abe322adbddbc/storeData")
    .then((response) => {
        items = response.data;
        itemList.innerHTML ='';

        for(let i = 0; i < items.length; i++) {
            const item = items[i];

            const li = document.createElement('li');
            li.textContent = ` ${item.name}  ${item.description}  ${item.price}  ${item.quantity}`;

            const buy1Button = document.createElement('button');
            buy1Button.textContent = 'Buy 1';
            buy1Button.addEventListener('click' , () => {
                updateItem(item._id, item.quantity - 1, item.name, item.description, item.price); 
            });

            const buy2Button = document.createElement('button');
            buy2Button.textContent = 'Buy 1';
            buy2Button.addEventListener('click' , () => {
                updateItem(item._id, item.quantity - 2, item.name, item.description, item.price); 
            });

            const buy3Button = document.createElement('button');
            buy3Button.textContent = 'Buy 1';
            buy3Button.addEventListener('click' , () => {
                updateItem(item._id, item.quantity - 3, item.name, item.description, item.price); 
            });

            li.appendChild(buy1Button);
            li.appendChild(buy2Button);
            li.appendChild(buy3Button);

            itemList.appendChild(li);
        }

    })
    .catch((err) => {
        console.log(err)
    });
}

function updateItem(itemId , newQuantity, name, description, price) {

    axios.put(`https://crudcrud.com/api/c22c17587d604c87982abe322adbddbc/storeData/${itemId}`, {
        name: name,
        description: description,
        price: price,
        quantity: newQuantity,
    })
    .then(() => {
        displayItems();
    })
    .catch((err) => {
        console.log(err)
    });

}

window.onload = function() {
    displayItems();
    itemForm.addEventListener('submit', addItem);
}


























