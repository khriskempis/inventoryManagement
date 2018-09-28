const ITEMS_ENDPOINT = "http://localhost:8080/items";
// const ITEMS_ENDPOINT = "https://obscure-springs-35933.herokuapp.com/items/"


// POST ITEM 

function postItemToApi(newItem, callbackFn){

  $.ajax({
    method: "POST",
    url: ITEMS_ENDPOINT,
    data: JSON.stringify(newItem),
    contentType: "application/json",
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`)
    }
  })
  .done(function(item){
    callbackFn(item);
    renderStatusMessage("Item Has Been Created");
  })
  .fail(function(err){
    console.log(err); 
  })
}

// RENDER ITEMS

function displayNewItem(item){
  const   htmlString = `  
      <h3>${item.name}</h3>

      <h5>Description</h5>
      <p id="item-description">
        ${item.description}
      </p>

      <h5>Category</h5>
      <p>${item.category}</p>

      <h5>Status</h5>
      <p>${item.status}</p>

      <h5>Location</h5>
      <p>La Habra</p>

      <h5>Quantity</h5>
      <p>${item.qty}</p>

      <h5>Cost</h5>
      <p>$${item.cost}</p>

      <h5>Price</h5>
      <p>$${item.price.regular}</p>

      <h5>Sale</h5>
      <p>$${item.price.sale}</p>`

  $('.results-display').html(htmlString);
  $('.results-display').removeClass('invisible');
}

function renderStatusMessage(message){
  const statusMessage = $('.status-message');
  statusMessage.html(`<p>${message}</p>`);
  statusMessage.removeClass('invisible');
  setTimeout(function(){
    statusMessage.addClass('invisible');
  }, 3000)
}


// CLICK EVENTS

function handleSignOut(){
  $('.js-sign-out').click(function(){
    localStorage.removeItem("token");
  })
};

function handleSubmit(){

  $('.js-add-item').submit(function(event){
    event.preventDefault(); 

    const itemForm = $('.js-add-item')

    const newItem = {
      name: itemForm.find('input[name="name"]').val(),
      description: itemForm.find('textarea').val(),
      category: itemForm.find('#category').val(),
      status: itemForm.find('input[name="status"]').val(),
      qty: itemForm.find('#quantity').val(),
      cost: itemForm.find('input[name="cost"]').val(),
      price: {
        regular: itemForm.find('input[name="price"]').val(),
        sale: itemForm.find('input[name="sale"]').val(),
      },
      image_url: itemForm.find('input[name="image"]').val()
    } 
    
    postItemToApi(newItem, displayNewItem)
  });
}

function handleInventoryButton(){
  const inventoryButton = $('.js-inventory-button')
  localStorage.removeItem("itemId");
  inventoryButton.click(function(event) {
    window.location.href = "../main/index.html"; 
  });
};

function init(){
  $(handleInventoryButton());
  $(handleSignOut());
  $(handleSubmit());
}

$(init())



