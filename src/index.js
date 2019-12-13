import './js/statusBar-script.js';
import './style/style.css';
import './style/menu-style.css';
import './style/statusBar-style.scss';
import '@fortawesome/fontawesome-free/js/all'
import Vue from 'vue';
import App from './app.vue'

new Vue({
    el:'#app',
    render: h => h(App)
})