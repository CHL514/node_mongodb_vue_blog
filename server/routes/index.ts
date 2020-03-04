const express = require('express')
const Course = require('../models/')
const router = express.Router()

// async 和 await
// async 可以放到回调函数的前面哦，不需要再重新创建一个包装函数了啦 !!!
// router.get('/getCourses', async (req, res) => { await Course.find() })

router.get('/getCourses', async (req, res) => {
	const course = await Course
		.find()
		.sort('name'); // 排序
	// if (!course.length) {
	// 	return res.status(404).send('Here are no any courses, Please add course!')
	// }
	res.send({
		status: 200,
		data: {
			message: 'all course datas',
			content: course
		}
	})
})

router.post('/login', (req, res) => {
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

router.delete('/deleteCourse', async (req, res) => {
	console.log(req.body.id)
	// 删除还可以用 findByIdAndRemove
	const result = await Course.deleteOne({
		_id: req.body.id
	})
	if (!result) {
		return res.status(404).send('Delete Fail, Please delete again!')
	}
	console.log(result);
	res.send({
		status: 200,
		data: result
	})
})

router.post('/addCourse', async (req, res) => {
	const course = new Course(req.body);
	// 返回添加的数据
	const result = await course.save();
	res.send({
		status: 200,
		content: result
	})
})

module.exports = router