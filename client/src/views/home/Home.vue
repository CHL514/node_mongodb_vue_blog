<template>
	<div class="home-wrapper">
		<h1>Welcome The Home Page.</h1>
		<Button @click="logout">logout</Button><br />
		<Button @click="getCourse">查询数据</Button>
		<Button @click="addCourse">添加数据</Button>
		<ul class="courses-ul">
			<li
				v-for="item in courses"
				:key="item._id"
				@click="deleteCourse(item._id)"
			>
				{{item.name + ' ' + item.author}}
			</li>
		</ul>


		<!-- 弹窗 -->
    
    <Modal
			:visible="addCourseModal"
			title="普通的Modal对话框标题"
		>
			<p>对话框内容</p>
			<p>对话框内容</p>
			<p>对话框内容</p>
    </Modal>
	</div>
</template>

<script>

import { mapActions } from 'vuex'
import request from '../../utils/request.js' 

export default {
	name: 'Home',
	data () {
		return {
			addCourseModal: false,
			courses: []
		}
	},
	created () {
		console.log('router info', this.$route)
	},
	methods: {
		...mapActions([
			'handleLogout'
		]),
		logout () {
			this.handleLogout().then(res => {
				if (res.status === 200) {
					this.$Message.success(res.message)
					this.$router.push({
						name: 'login'
					})
				}
			})
		},
		getCourse () {
			request({
				url: '/getCourses',
				method: 'get'
			}).then(res => {
				const result = res.data;
				if (result.status === 200) {
					this.courses = result.data.content;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		deleteCourse (id) {
			console.log(id)
			request({
				url: 'deleteCourse',
				data: {
					id
				},
				method: 'delete'
			}).then(res => {
				console.log(res)
				if (res.data.status === 200) {
					this.$Message.success('delete success !')
					this.getCourse()
				}
			}).catch(err => {
				this.$Message.success('delete fail, ' + err.message)
			})
		},
		addCourse () {
			// default add-data
			const addData = {
				name: 'MongoDB and Mongoose' + Math.round(Math.random()),
				data: Date.now,
				author: 'Alex.Cheng',
				tags: ['Node.js', 'Vue.js', 'MongoDB', 'Mongoose'],
				isPublished: false
			}

			request({
				url: 'addCourse',
				method: 'post',
				data: addData
			}).then(res => {
				console.log(res)
				if (res.data.status === 200) {
					this.$Message.success('add success !')
					this.getCourse()
				}
			}).catch(err => {
				this.$Message.error('Add Fail' + err.message)
			})
		}
	}
}
</script>

<style scoped>
	div.home-wrapper {
		text-align: center;
	}
	ul.courses-ul li {
		list-style: none;
		margin-bottom: 24px;
	}
	ul.courses-ul li:hover {
		background-color: red;
		color: #fff;
	}
</style>
