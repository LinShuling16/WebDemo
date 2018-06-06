<template>
  <div class="hello">
    <h1 v-text="msg"></h1>
    <div v-html="html" v-bind:class="[myclass,testclass]"></div>
    <input type="text" v-model="newItem"  v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" :class="{finised:item.isFinised}" v-on:click="itemfun(item)">{{item.label}}</li>
    </ul>
    <p>child tells me:{{ childWords}}</p>
    <component-a msgfromfather ="you die!" v-on:child-tell-me-somethings="listenToMyBoy"></component-a>

  </div>
</template>

<script>
  import Stroe from "./store"
  import ComponentA from "./componentA"
  console.log(Stroe);
export default {
  name: 'hello',
  data: function() {
    return {
      msg: 'This is a todo List',
      html: '<p>Hello world!</p>',
      myclass:"this is myclass",
      testclass:"this is testclass",
      items:[],/*Stroe.fetch() 这里不能实现，有问题*/
      newItem:"",
      childWords:""
    }
  },
  watch:{
    items:{
      handler: function(items){
       Stroe.save(items);
      },
      deep:true
    }
  },
  components:{
    componentA:ComponentA
  },
  methods:{
    itemfun: function(item){
      item.isFinised = !item.isFinised;
    },
    addNew: function () {
      this.items.push({
        label:this.newItem,
        isFinised:false
      })
      this.newItem = "";
    },
    listenToMyBoy:function (msg) {
      this.childWords = msg;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .finised{
    text-decoration:underline;
  }
/*h1, h2 {*/
  /*font-weight: normal;*/
/*}*/

/*ul {*/
  /*list-style-type: none;*/
  /*padding: 0;*/
/*}*/

/*li {*/
  /*display: block;*/
  /*margin: 0 10px;*/
/*}*/

/*a {*/
  /*color: #42b983;*/
/*}*/
</style>
