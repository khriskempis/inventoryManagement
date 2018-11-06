// const USERS_ENDPOINT = 'http://localhost:8080/users';
const USERS_ENDPOINT = "https://obscure-springs-35933.herokuapp.com/users/"

function createUser(newUser, callbackFn){
	$.ajax({
		method: "POST",
		url: USERS_ENDPOINT,
		data: JSON.stringify(newUser),
		contentType: "application/json"
	})
	.done(data => {
		callbackFn(data);
		setTimeout(redirectToMain, 2000)
	})
	.fail((data, err) => {
		errorMessage(data.responseJSON);
		console.log(data)
	})
};

function redirectToMain(){
		window.location.href = "../index.html"
}

function errorMessage(res){
	const message = `${res.location} ${res.message.toLowerCase()}`
	$('.js-signup-status-message').html(message);
};


function renderMessage(data){
	const message = `<p>Welcome ${data.firstName || data.username}! </p>
	<p>You are now being redirected to the Log In page</p>
	<p>Please wait..</p>`
	$('.new-user-info').html(message)
};


function handleSubmit() {
	const signUpForm = $('.js-sign-up')

	signUpForm.submit(function(event){
		event.preventDefault();
		// check if password matches 
		const password = $('#password').val();
		const confirmPassword = $('#confirm-password').val();

		if(password !== confirmPassword){
			return $('.js-signup-status-message').html('<p>Passwords do not Match!</p>'); 
		}

		// grab values from client
		const newUser = {
			username: signUpForm.find('input[name="username"]').val(),
			password: signUpForm.find('input[name="password"]').val(),
			firstName: signUpForm.find('input[name="first-name"]').val(),
			lastName: signUpForm.find('input[name="last-name"]').val()
		}

		createUser(newUser, renderMessage)
	});
};

$(handleSubmit());