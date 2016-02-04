document.addEventListener('dom-change', function() {
	var btn = document.querySelector('#login_button');
	btn.addEventListener('click', function() {
		document.querySelector("#index_login_dialog").open();
	});
});

function submit_hidden_form(event) {
	console.log(event);
	var form_username = document.createElement('input');
	var form_password = document.createElement('input');

	form_username.setAttribute('type', 'hidden');
	form_password.setAttribute('type', 'hidden');

	form_username.value = document.getElementById('paper_username').value;
	form_password.value = document.getElementById('paper_password').value;

	document.forms[0].submit();
}
