let itemId = localStorage.getItem("itemId"); 


// let itemId = "5b9c139c1834c51c948215e1"


// API CALLS 

function getItemInfo(itemId, callbackFn){
  // console.log(itemId);
  // console.log(INVENTORY_ENDPOINT + itemId)

  $.ajax({
    method: "GET",
    url: INVENTORY_ENDPOINT + itemId,
    contentType: "application/json",
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Bearer " + token)
    }
  })
  .done(data => {
    displayItem(data);
  })
  .fail(err =>{
    console.log(err); 
  });
};

function updateItem(itemId, updatedFields, callbackFn){
  $.ajax({
    method: "PUT",
    url: INVENTORY_ENDPOINT + itemId,
    data: JSON.stringify(updatedFields),
    contentType: "application/json",
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Bearer " + token)
    }
  })
  .done(res => {
    getItemInfo(itemId, displayItem)
    renderStatusMessage('Item has been updated');
    renderUpdateButton(); 
  })
  .fail(err => {
    console.log(err); 
  }) 
};

// RENDER ITEMS 

function displayItem(data){
  let item = data
  const htmlString = `  
    <div class="col-5">
      <img src="../source-files/img/alien.PNG">
    </div>
    <div class="price-display">

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
      <p>$${item.price.sale}</p>
    </div>
`

  $('.item-display').html(htmlString);
};

function renderStatusMessage(message){
  const statusMessage = $('.status-message');
  statusMessage.html(`<p>${message}</p>`);
  statusMessage.removeClass('invisible');
  setTimeout(function(){
    statusMessage.addClass('invisible');
  }, 3000)
}

function displayUpdatedItems(field, value){
  const htmlString = `<p>${field} => ${value}</p>`;
  $('.updated-items').append(htmlString)
};

function renderUpdateButton(){

  const htmlString = `<button class="js-update-item">Update Item</button>`
  $('.update-button').html(htmlString);
  $('.pop-up').addClass('hidden');
  updatedFields = {}
  $('.updated-items').html('<h5>Fields To Be Updated</h5>'); 
}

function renderConfirmUpdateButtons(){
  const htmlString = `<button class="js-update-fields" type="submit">UPDATE FIELDS?</button>
      <button class="update-fields-cancel">Cancel</button>`
  $('.update-button').html(htmlString);
}






// CLICK EVENTS
let updatedFields = {};

function handleAddUpdateItem(){
  const addUpdatedItem = $('.form-pop-up').find('.js-add-updated-item');
  let field = $('#field');
  let value = $('#updated-value');


  addUpdatedItem.click(event => {
    event.preventDefault();

    updatedFields[field.val().toLowerCase()] = value.val();

    displayUpdatedItems(field.val(), value.val() )

    field.val('Name');
    value.val('');

    renderConfirmUpdateButtons();
  });
};

function handleUpdateItemButton(){
  const updateButton = $('.message-board').find('.update-button');
  updateButton.on("click", ".js-update-item", function(event) {
    $('.pop-up').removeClass('hidden'); 
  });
};

function handleCancelButton(){
  const cancelButton = $('.message-board').find('.update-button');
  cancelButton.on("click", ".update-fields-cancel", function(event){
    renderUpdateButton();
  });
};

function handleUpdateFieldsButton(){
  const updatedFieldsButton = $('.message-board').find('.update-button');
  updatedFieldsButton.on("click", ".js-update-fields", function(event) {

    if(JSON.stringify(updatedFields).length < 3){
      return renderStatusMessage("Please add Fields to be updated");
    };
    
    updateItem(itemId, updatedFields);
    updatedFields = {};
  })
}

function handleInventoryButton(){
  const inventoryButton = $('.js-inventory-button')
  localStorage.removeItem("itemId");
  inventoryButton.click(function(event) {
    window.location.href = "../main/index.html"; 
  });
};

function init(){
  $(getItemInfo(itemId, displayItem));
  $(handleInventoryButton());
  $(handleUpdateItemButton());
  $(handleAddUpdateItem());
  $(handleUpdateFieldsButton());
  $(handleCancelButton());
}

$(init()); 