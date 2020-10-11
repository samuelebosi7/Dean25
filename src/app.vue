<template>

  <div id="app">
      <div id="overlay" v-bind:class="{overlayActive: isActive}">> <div id="overlay-text">ACTAM Project</div> <div id = "container"> <button class="btn draw-border" v-on:click="start">ENTER</button> </div></div>
      <top-bar v-on:changeVolume="changeVolume"></top-bar>
      <div id = "central-part">
        <central-part v-bind:mastVolume="masterVolume"></central-part>
      </div>
  </div>
  
</template>

<script>
import Vuex from 'vuex'
import * as firebase from 'firebase';
import CentralPart from './components/central-part.vue'
import TopBar from './components/top-bar.vue'
import VueSlider from 'vue-slider-component'
export const EventBus = new Vue();

var app = firebase.initializeApp({ apiKey: "AIzaSyA1j4rhDzKf1CD8ndIIRrNve3lSri-vbA8",
authDomain: "actam-test-ed131.firebaseapp.com",
databaseURL: "https://actam-test-ed131.firebaseio.com",
projectId: "actam-test-ed131",
storageBucket: "actam-test-ed131.appspot.com",
messagingSenderId: "516631775225",
appId: "1:516631775225:web:81bb8274c50bb5ce375f28" });
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    instrumentList: [
      // { id: 0, title: 'Cymbals' },
      // { id: 1, title: 'Cymbals' },
      // { id: 2, title: 'Cymbals' }
      ],
      
    links: [],
    storage: firebase.storage(),
    freeModeEnabled: false,
  },

  getters: {
    getFreeMode: state => {
      return state.freeModeEnabled;
    }
  },

  actions:{
        getFirebaseData: ({commit}) => { //downloads data from firebase
            var db = firebase.firestore()
            db.collection("samples").get().then(querySnapshot => { 
           if (querySnapshot.empty) {
             console.log("Couldn't retrieve sample links from database!")
           }
           else {
             //this.loading = false;
             var links = [];
             querySnapshot.forEach(doc => {
             links.push(doc);});
            }
            commit("setLinks", links); //triggers "setLinks" mutation
            
        });
    }
  },
  mutations:{
    setLinks(state, val) {//copies value downloaded from firebase in state.links
      state.links = val;
    },

    setFreeMode(state)
    {
      state.freeModeEnabled = !state.freeModeEnabled;
    }
  }
})

store.dispatch("getFirebaseData"); //triggers "getFirebaseData" action upon startup

export default {
  data() {
    return {
      masterVolume: 50,
      isActive: false,
    };
  },
  store,
  components: {
    CentralPart,
    TopBar,
    VueSlider
  },
  methods: {
    changeVolume: function(value){
      this.masterVolume=value.volume;
    },

    start: function(){
      this.isActive = true;
      EventBus.$emit("startAudioContext")
    }
  }
}
</script>
