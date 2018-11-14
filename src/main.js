import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
//import '../static/css/theme-green/index.css'; // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";
Vue.use(ElementUI, {
	size: 'small'
});
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
	Vue.prototype.appUrl='http://apiadmin.test';
	//Vue.prototype.appUrl='http://120.77.146.13';
	const token = localStorage.getItem('token');
	const startTime = localStorage.getItem('token_start_time');
	const nowTime = (new Date()).getTime();
	//使用钩子函数对路由进行权限跳转
	Vue.prototype.token = localStorage.getItem('token' );
	if (nowTime - startTime > process.env.TOKEN_TIME && to.path !== '/login') {
		localStorage.removeItem('ms_username');
		localStorage.removeItem('token');
		localStorage.removeItem('token_start_time');
		Vue.prototype.$alert('用户登录信息已失效，请重新登录', {
			confirmButtonText: '确定',
			type: 'warning',
			callback: action => {
				next('/login');
			}
		});
	}
	console.log(to.path);
	if (!token && to.path !== '/login') {
		next('/login');
	} else if (to.meta.permission) {
		// 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
		token === 'admin' ? next() : next('/403');
	} else {
		// 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
		if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
			Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
				confirmButtonText: '确定'
			});
		} else {
			next();
		}
	}
})
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
