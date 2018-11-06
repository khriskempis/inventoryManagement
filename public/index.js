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
		renderMessage('You are being redirected..')
		setTimeout(redirectToMain, 1000)
	})
	.fail((data, err) => {
		errorMessage(data.responseJSON);
		console.log(data)
	})
};

function redirectToMain(){
		window.location.href = "../signIn/signIn.html"
}

function errorMessage(res){
	const message = `${res.location} ${res.message.toLowerCase()}`
	$('.register-status-message').html(message);
};

function renderMessage(message){
	const messageElement = $('.register-status-message')

	messageElement.html(message)
}

function handleSubmit() {
	const signUpForm = $('.js-register-form');

	signUpForm.submit(function(event){
		event.preventDefault();
		// check if password matches 
		const password = $('#password').val();
		const confirmPassword = $('#confirm-password').val();

		if(password !== confirmPassword){
			return $('.register-status-message').html('<p>Passwords do not Match!</p>'); 
		}

		// grab values from client
		const newUser = {
			username: signUpForm.find('input[name="username"]').val(),
			password: signUpForm.find('input[name="password"]').val(),
		}

		createUser(newUser, renderMessage)
	});
};


AOS.init();

$(handleSubmit());

$('#try-button').click(function() {
  $('html, body').animate(
    {
      scrollTop: $('.register-form-container').offset().top,
    },
    1500,
  );
});