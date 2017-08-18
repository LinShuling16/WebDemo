<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
    <h1 v-text="msgfromfather"></h1>
    <button v-on:click="onClickMe">Open mouse!</button>
  </div>
</template>

<script>
   export default {
     data: function (){
       return {
         msg: 'Hello form component!',
         tellmsg:'I want to you something.'
       }
     },
     props: ['msgfromfather'],
     methods:{
       onClickMe:function () {
            console.log(this.msgfromfather);
            this.$emit('child-tell-me-somethings',this.tellmsg);
       }
     }
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 h1{
   color:#42b983;
 }
</style>
