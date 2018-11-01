let itemId = localStorage.getItem("itemId"); 

// API CALLS 

function getItemInfo(itemId, callbackFn){

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

// update values needs access to these values from data
let salePrice 
let regularPrice

function displayItem(data){
  let item = data;
  salePrice = item.price.sale;
  regularPrice = item.price.regular
  
  const defaultImgLink = "https://static.boredpanda.com/blog/wp-content/uploads/2017/02/action-toys-scenes-marvel-hotkenobi-15-58ab2d60002ce__700.jpg"
  const htmlString = `  
    <div class="photo-image col-5">
      <h3>${item.name}</h3>
      <img src="${defaultImgLink}">
    </div>
    <div class="price-display">
      <div> 

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
      </div>
      <div> 
        <h5>Quantity</h5>
        <p>${item.qty}</p>

        <h5>Cost</h5>
        <p>$${item.cost}</p>

        <h5></h5>Price</h5>
        <p class="js-price">$${item.price.regular}</p>

        <h5>Sale</h5>
        <p class="js-sale">$${item.price.sale}</p>
      </div>
    </div>
`

  $('.item-display').html(htmlString);
};

function renderStatusMessage(message){
  const statusMessage = $('.status-message');
  statusMessage.html(`<p>${message}</p>`);
  statusMessage.removeClass('invisible');
  // removes status message after 3 sec
  setTimeout(function(){
    statusMessage.addClass('invisible');
  }, 3000)
}

function displayUpdatedItems(field, value){
  const htmlString = `<p>${field} => ${value}</p>`;
  $('.updated-items').append(htmlString)
};

function renderUpdateButton(){
  // renders the update button and hides pop up form
  const htmlString = `<button class="js-update-item">Update Item</button>`
  $('.update-button').html(htmlString);
  $('.pop-up').addClass('hidden');
  updatedFields = {}
  $('.updated-items').html('<h5>Fields To Be Updated</h5>'); 
}

function renderConfirmUpdateButtons(){
  // render green update button
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
    const selectedField = field.val().toLowerCase();

    console.log(salePrice)

    // need to fix 
    if(selectedField === "price"){
      updatedFields.price = {
        regular: value.val(),
        sale: salePrice
      }
    } 
    if(selectedField === "sale") {
      updatedFields.price = {
        regular: regularPrice,
        sale: value.val()
      }    
    } else {
      updatedFields[selectedField] = value.val();
    }

    displayUpdatedItems(field.val(), value.val() )

    field.val('Name');
    value.val('');

    renderConfirmUpdateButtons();
  });
};

function handleUpdateItemButton(){
  // reveals pop up form
  const updateButton = $('.message-board').find('.update-button');
  updateButton.on("click", ".js-update-item", function(event) {
    $('.pop-up').removeClass('hidden'); 
  });
};

function handleCancelButton(){
  // calls render update and removes pop up form
  const cancelButton = $('.message-board').find('.update-button');
  cancelButton.on("click", ".update-fields-cancel", function(event){
    renderUpdateButton();
  });
};

function handleUpdateFieldsButton(){
  // updates item 
  const updatedFieldsButton = $('.message-board').find('.update-button');
  updatedFieldsButton.on("click", ".js-update-fields", function(event) {
    // check to see if fields to be updated is populated
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