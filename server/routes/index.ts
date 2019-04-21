const express = require('express')
const Course = require('../models/')
const router = express.Router()

router.get('/getCourses', function(req, res) {
	async function getCourse() {
		const course = await Course.find();
		res.send({
			status: 200,
			data: {
				message: 'all course datas',
				content: course
			}
		})
	}
	getCourse()
})

router.post('/login', function(req, res) {
	if (req.body.username === 'alex.cheng') {
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

router.delete('/deleteCourse', (req, res) => {
	console.log(req.body.id)
	async function deleteCouse() {
		const result = await Course.deleteOne({
			_id: req.body.id
		})
		console.log(result);
		res.send({
			status: 200,
			data: result
		})
	}
	deleteCouse()
})

router.post('/addCourse', (req, res) => {
	const course = new Course(req.body);
	async function modifyCourse() {
		// 返回添加的数据
		const result = await course.save();
		console.log('result', result);
		res.send({
			status: 200,
			content: result
		})
	}
	modifyCourse()
})

module.exports = router