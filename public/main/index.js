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

// generate individual html for each item
function generateItemHtml(item, index) {
	return `<tr>
						<th item-name="${item.name}">${item.name}</th>
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

function renderConfirmDelete(itemName){
	$('.confirm-delete').removeClass('hidden');
	$('.js-delete-message').text(`Would you like to Delete the item ${itemName}?`)
}

// render Items to client 
function renderItemsHtml(){
	let itemsHtml =	getItems(generateAndDisplayArrayOfItems);
};


// Click Events

function handleViewButton() {
	const viewButton = $('.inventory-display').find('.js-table-data');
	viewButton.on("click", ".js-view-button", function(event){
		let itemId = $(this).parent().attr("item-id");
		// console.log(itemId);
		localStorage.setItem("itemId", `${itemId}`)
		window.location.href = "../itemDisplay/index.html"; 
	});
}

function handleDeleteButton() {
	const deleteButton = $('.inventory-display').find('.js-table-data');
	deleteButton.on('click', '.js-delete-button', function(event){
		let deleteItemId = $(this).parent().attr("item-id");
		let deleteItemName = $(this).parent().siblings("th").attr("item-name");
		renderConfirmDelete(deleteItemName);
		localStorage.setItem("deleteItemId", `${deleteItemId}`);
	})
}

function handleSignOut(){
	$('.js-sign-out').click(function(){
		localStorage.removeItem("token");
	})
};

function init(){
	$(handleDeleteButton());
	$(handleViewButton());
	$(handleSignOut());
	$(renderItemsHtml());
}

$(init());