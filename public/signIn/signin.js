const USERS_ENDPOINT = "http://localhost:8080/auth/login";
// const USERS_ENDPOINT = "https://obscure-springs-35933.herokuapp.com/auth/login";
let loggedIn = false; 


function loginUser(userInfo) {
	$.ajax({
		method: "POST",
		url: USERS_ENDPOINT,
		data: JSON.stringify(userInfo),
		contentType: "application/json"
	})
	.done(token => {
		localStorage.setItem("token", token.authToken);
		loggedIn = true;
		displayMessage("You have successfully Logged In");
		setTimeout(redirectToMain, 2000)
	})
	.fail(err => {
		console.log(err);
		displayMessage("Incorrect username or password, Please Try Again")
	});
};

function displayMessage(message){
	$('.js-welcome-status-message').text(message); 
	console.log(message); 
};

// check if logged in then redirect
function redirectToMain(){
		if(loggedIn){
			window.location.href = "../main/index.html"
		}
}


function handleSubmit(){

	const signInForm = $('.js-sign-in');

	signInForm.submit(function(event){
		event.preventDefault();

		const userCredentials = {
			username: signInForm.find('input[name="username"]').val(),
			password: signInForm.find('input[name="password"]').val()
		}

		loginUser(userCredentials)
	});
};


$(handleSubmit())