const ITEMS_ENDPOINT = "http://localhost:8080/items";


// POST ITEM 

function postItemToApi(newItem, callbackFn){

	$.ajax({
		method: "POST",
		url: ITEMS_ENDPOINT,
		data: JSON.stringify(newItem),
		contentType: "application/json"
	})
	.done(function(item){
		callbackFn(item);
	})
	.fail(function(err){
		console.log(err); 
	})
}

function displayNewItem(item){
	const tableHtmlString = `<table>
			<thead>
				<tr>
					<th>Item</th>
					<th>Cost</th>
					<th>Price</th>
					<th>Sale</th>
					<th>Qty</th>
					<th>Location</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
				<tr>
						<th>${item.name}</th>
						<td>${item.cost}</td>
						<td>$${item.price.regular}</td>
						<td>$${item.price.sale}</td>
						<td>${item.qty}</td>
						<td>La Habra</td>
						<td>${item.status}</td>
						<td><button class="js-update-button">update</button></td>
					</tr>`

	$('.results-display').html(tableHtmlString)
}



function handleSubmit(){

	$('.js-add-item').submit(function(event){
		event.preventDefault(); 

		const itemForm = $('.js-add-item')

		const newItem = {
			name: itemForm.find('input[name="name"]').val(),
			description: itemForm.find('textarea').val(),
			category: itemForm.find('input[name="category"]').val(),
			status: itemForm.find('input[name="status"]').val(),
			qty: itemForm.find('select').val(),
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

$(handleSubmit())



