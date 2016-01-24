document.addEventListener('dom-change', function() {
	var btn = document.querySelector('#login_button');
	btn.addEventListener('click', function() {
		document.querySelector("#index_login_dialog").open();
	});
});