import './style/instrument-style.css';
import './style/knob.css';
import './style/menu-style.css';
import './style/statusBar-style.scss';
import '@fortawesome/fontawesome-free/js/all';
import './style/sequencer.scss';
import './style/slider.css';

import App from './app.vue';


new Vue({
    el:'#app',
    render: h => h(App)
})