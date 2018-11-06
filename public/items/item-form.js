// const ITEMS_ENDPOINT = "http://localhost:8080/items";
const ITEMS_ENDPOINT = "https://obscure-springs-35933.herokuapp.com/items/"


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
      <p>$${item.price}</p>

      <h5>Sale</h5>
      <p>$${item.sale}</p>`

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

function handleAddItemCancel() {
	$('.js-form-cancel-button').on('click', function(event){
		event.preventDefault();
		$('.pop-up-add-item').addClass('hidden');
	});
};


function handleSubmit(){

  $('.js-add-item').submit(function(event){
    event.preventDefault(); 

    const itemForm = $('.js-add-item')
    // grab values from user
    const newItem = {
      name: itemForm.find('input[name="name"]').val(),
      description: itemForm.find('textarea').val(),
      category: itemForm.find('#category').val(),
      status: itemForm.find('#status').val(),
      qty: itemForm.find('#quantity').val(),
      cost: itemForm.find('input[name="cost"]').val(),
      price: itemForm.find('input[name="price"]').val(),
      sale: itemForm.find('input[name="sale"]').val(),
      image_url: itemForm.find('input[name="image"]').val()
    } 
    // send values
    postItemToApi(newItem, displayNewItem)
    getItems(generateAndDisplayArrayOfItems);
    $('.pop-up-add-item').addClass('hidden');
  });
}

function init(){
  $(handleAddItemCancel());
  $(handleSubmit());
}

$(init())



