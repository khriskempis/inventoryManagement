MOCK_ITEM_INFO = []

function populateMockData(num){
	for(let i=1; i<=num; i++){
		let object = {
			"id": `${i}`,
			"name": `Item name ${i}`,
			"description": `item description of number ${i}`,
			"qty": i/1,
			"cost": i*3,
			"price": {
				"regular": i*6,
				"sale": i*3
			},
			"image_url": "https://image.com/image",
			"category": ["Action Figure", "Godzilla"]
		}
		MOCK_ITEM_INFO.push(object)
	}
}

// get data from API
function getItems(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_ITEM_INFO)}, 100);
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
						<td>not shipped</td>
						<td><button class="js-update-button">update</button></td>
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

function init(){
	$(populateMockData(10))
	$(renderItemsHtml());
}

$(init());