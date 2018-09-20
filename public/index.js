const USERS_ENDPOINT = "http://localhost:8080/users"


function loginUser(userInfo) {
	$.ajax({
		method: "POST",
		data: userInfo,
		contentType: "application/json"
	})
	.done(token => {
		localStorage.setItem("token", token);
		console.log(localStorage);
		displayMessage("You have successfully Logged In")
	})
	.fail(err => {
		console.log(err);
		displayMessage("An Error Occured")
	});
};

function displayMessage(message){
	$('.welcome-message').append(message); 
	console.log(message); 
};


function handleSubmit(){

	const signInForm = $('.js-sign-in');

	signInForm.submit(function(event){
		event.preventDefault();

		const userCredentials = {
			username: signInForm.find('input[name="username"]'),
			password: signInForm.find('input[name="password"]')
		}

		loginUser(userCredentials)
	});
};


$(handleSubmit())