//import './js/instrument-script.js';
import './js/statusBar-script.js';
import './style/style.css';
import './style/menu-style.css';
import './style/statusBar-style.scss';
import App from './app.vue'
import Instrument from './components/instrument.vue'

Vue.component('instrument', Instrument);

new Vue({
    el:'#app',
    render: h => h(App)
})