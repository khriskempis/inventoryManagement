const INVENTORY_ENDPOINT = "http://localhost:8080/items/";

// get data from API
function getItems(callbackFn) {
	// setTimeout(function(){ callbackFn(MOCK_ITEM_INFO)}, 100);
	$.ajax({
		method: "GET",
		url: INVENTORY_ENDPOINT,
		dataType: "json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))
		}
	})
	.done(function(data){
		callbackFn(data);
	})
	.fail(function(err){
		console.log(err);
	});
};

function getItemInfo(itemId){
	// console.log(itemId);
	// console.log(INVENTORY_ENDPOINT + itemId)

	$.ajax({
		method: "GET",
		url: INVENTORY_ENDPOINT + itemId,
		contentType: "application/json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))
		}
	})
	.done(data => {
		console.log(data);
	})
	.fail(err =>{
		console.log(err); 
	});
};

// generate individual html for each item
function generateItemHtml(item, index) {
	return `<tr>
						<th>${item.name}</th>
						<td>${item.cost}</td>
						<td>$${item.price.regular}</td>
						<td>$${item.price.sale}</td>
						<td>${item.qty}</td>
						<td>La Habra</td>
						<td>${item.status}</td>
						<td class="edit-buttons" item-id="${item._id}">
							<button class="js-view-button">
								<img src="../source-files/svg/pencil.svg">
							</button>
							<button class="js-delete-button">
								<img src="../source-files/svg/trash.svg">
							</button>
						</td>
					</tr>`
};

function generateAndDisplayArrayOfItems(data){
	let itemsHtml = [];
	data.map((item, index) => {
		itemsHtml.push(generateItemHtml(item, index))
	});
	$('.js-table-data').html(itemsHtml);
};

// render Items to client 
function renderItemsHtml(){
	let itemsHtml =	getItems(generateAndDisplayArrayOfItems);
};


// Click Events

function handleViewButton() {
	const viewButton = $('.inventory-display').find('.js-table-data');
	viewButton.on("click", ".js-view-button", function(event){
		event.preventDefault();
		let itemId = $(this).parent().attr("item-id");
		localStorage.setItem("itemId", `${itemId}`)
		getItemInfo(itemId)
		window.location.href = "../itemDisplay/index.html"; 
	});
}

function handleDeleteButton() {
	$('.js-delete-button').click(function(){
		console.log('clicked'); 
	})
}

function handleSignOut(){
	$('.js-sign-out').click(function(){
		localStorage.removeItem("token");
	})
};

function init(){
	$(handleViewButton())
	$(handleSignOut());
	$(renderItemsHtml());
}

$(init());