var router = require('express').Router()

router.get('/', function(req, res) {
	res.render('index.ejs', {
		title: "Notify.gs"
	});
});

module.exports = router;