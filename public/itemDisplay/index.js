const token = localStorage.getItem("token");

let itemId = localStorage.getItem("itemId"); 


// let itemId = '5b9c11ea1834c51c948215d9'

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
	})
	.fail(err => {
		console.log(err); 
	}) 
};

function displayItem(data){
	let item = data
	const htmlString = `	
		<div class="col-5">
			<img src="../source-files/img/alien.PNG">
		</div>
		<div class="price-display">

			<h3>${item.name}</h3>

			<h5>Description</h5>
			<p class="item-description">
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

function displayUpdatedItems(field, value){
	const htmlString = `<p>${field}: ${value}</p>`;

	$('.updated-items').append(htmlString)
};

let updatedFields = {};

function handleAddUpdateItem(){
	const addUpdatedItem = $('.form-pop-up').find('.js-add-updated-item');
	let field = $('#field');
	let value = $('#updated-value');


	addUpdatedItem.click(event => {
		event.preventDefault();

		updatedFields[field.val()] = value.val();

		displayUpdatedItems(field.val(), value.val() )

		// console.log(updatedFields)

		field.val('');
		value.val('');

	});
};

function handleUpdateItemButton(){
	const updateButton = $('.js-update-item');
	updateButton.click(event => {
		$('.form-pop-up').removeClass('hidden'); 
	});
};

function handleCancelButton(){
	$('.update-fields-cancel').click(event=> {
		$('.form-pop-up').addClass('hidden');
		updatedFields = {}
		$('.updated-items').html(''); 
	});
};

function handleUpdateFieldsButton(){
	$('.js-update-fields').click(event => {
		updateItem(itemId, updatedFields)
	})
}

function handleInventoryButton(){
	const inventoryButton = $('.js-inventory-button')
	localStorage.removeItem("itemId");
	inventoryButton.click(event => {
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