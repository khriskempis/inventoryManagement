let itemId = localStorage.getItem("itemId"); 

function getItemInfo(itemId, callbackFn){
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
		displayItem(data);
		localStorage.removeItem("itemId"); 
		console.log(localStorage); 
	})
	.fail(err =>{
		console.log(err); 
	});
};

function displayItem(data){
	console.log(data); 
}




function init(){
	$(getItemInfo(itemId, displayItem));
}

$(init()); 