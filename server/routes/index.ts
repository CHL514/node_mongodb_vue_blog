const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
	res.send({
		status: 200,
		data: {
			title: 'welcome to home page !',
			content: 'The HOME content'
		}
	})
})

router.post('/login', function(req, res) {
	console.log('login: req.body', req.body)
  res.send(req.body)
})

module.exports = router