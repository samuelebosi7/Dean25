<template>
  <div>
    <div :id="'actualSample'+id" v-on:click="selectInstrument">
      Cy
    </div>

    <!-- <ul class="sub-menu genre sample"  v-bind:class="{active: isActive}">

      <ul v-for=" el in genre" :class="'genre'+(el.j+1)" v-text="el.gen" >
        <li :class="'sub-menu item genre'+(el.j)" >
          <ul v-for="sub in el.sub">
            <li  v-text="sub"></li>
          </ul>
        </li>
      </ul>

    </ul> -->


    <ul class="sub-menu genre sample"  v-bind:class="{active: isActive}">
      <ul v-for=" el in genre" :class="'genre'+(el.j+1)">
        <li v-text="el.gen" @mouseover="el.disp = true" @mouseout="el.disp = false" ></li>
        <ul :class="['sub-menu', 'item' , 'genre'+(el.j), el.disp ? 'active' : '',]"> 
          <li v-for="sub in el.sub" v-text="sub" @mouseover="el.disp = true" @mouseout="el.disp = false" v-on:click="updateSample(sub)"></li>
        </ul>
      </ul>
    </ul>



  </div>

</template>

<script>
import store from '../app.vue';

export default {
name: 'prova',
 props: ['id'],
 data() {
    return {
      genre: [],    
      isActive: false,
    }
  },

  computed: {
    links () {
        return this.$store.state.links;
    },
  },
  created(){
    this.accessStore();
  },
  methods: { 

    accessStore: function() {
        
        var data = this.createData();
        var i = 0;
        
        //Per stampare nomi collection e nomi relativi elementi di ogni collection
        this.links.forEach(element => {
            this.genre.push({j: i , gen: element.id , sub: [] , disp: false});
            Object.keys(data[i]).forEach(el => { 
              this.genre.find(x => !x.gen.localeCompare(element.id)).sub.push(el);
            });
            i++;
        });

        this.genre.forEach(el => {console.log(el)})
    },

    createData() {
        var l = [];

        this.links.forEach(doc => {
            l.push(doc.data());
        });

        return l;
    },

    selectInstrument: function() {
      this.isActive = !this.isActive;
    },

    updateSample(el) {
    
    },

    mouseOver: function() {
      this.ciao = !this.ciao;
      console.log(this.ciao)
    }

  }   
}
</script>