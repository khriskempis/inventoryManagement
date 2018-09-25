const INVENTORY_ENDPOINT = "http://localhost:8080/items/";
let token = localStorage.getItem("token");
let deleteItemId;

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

function deleteItem(itemId){
	console.log(`Deleting Item ${itemId}`)

	$.ajax({
		method: "DELETE",
		url: INVENTORY_ENDPOINT + itemId,
		contentType: "application/json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Bearer " + token)
		}
	})
	.done(res => {
		console.log(res);
		getItems(generateAndDisplayArrayOfItems);
		renderStatusMessage(`Item has been deleted`)
	})
}

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

function removeStatusMessage(){
	$('.status-message').addClass("invisible");
	$('.confirm-delete').addClass("invisible");
}

function renderConfirmDelete(itemName){
	$('.confirm-delete').removeClass('invisible');
	// $('.js-delete-message').text(`Delete the item ${itemName}?`)
	$('.confirm-delete-button').text(`Delete ${itemName} item?`)
}

function renderStatusMessage(text){
	$('.status-message').html(`${text}`)
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
		deleteItemId = $(this).parent().attr("item-id");
		let deleteItemName = $(this).parent().siblings("th").text();

		renderConfirmDelete(deleteItemName);
		localStorage.setItem("deleteItemId", `${deleteItemId}`);
	})
};

function handleConfirmDeleteButton() {
	const confirmDeleteButton = $('.confirm-delete').find('.confirm-delete-button');
	confirmDeleteButton.click(function(event){
		$('.status-message').removeClass("invisible");
		deleteItem(deleteItemId);
		setTimeout(function(){removeStatusMessage()}, 4000)
	});
};

function handleCancelDeleteButton() {
	$('.cancel-delete-button').click(function(event){
		removeStatusMessage();
	});
};



function handleSignOut(){
	$('.js-sign-out').click(function(){
		localStorage.removeItem("token");
	})
};

function init(){
	$(handleCancelDeleteButton());
	$(handleConfirmDeleteButton());
	$(handleDeleteButton());
	$(handleViewButton());
	$(handleSignOut());
	$(renderItemsHtml());
}

$(init());