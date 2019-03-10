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
	
	if (req.body.user === 'alex.cheng') {
		// 表明登录成功
		res.send({
			status: 200,
			message: true,
			userInfo: req.body
		})
	} else {
		res.send({
			status: 404,
			message: '用户名或者密码错误'
		})
	}
})

module.exports = router