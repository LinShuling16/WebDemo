<template>
  <div class="chatWin">
    <div class="chatWinLeft">
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </div>
    <div class="chatArea">
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </div>
    <textarea class="enterMsg"></textarea>
  </div>
</template>

<script>
  import initScroll from './common/js/nicescroll.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化滚动条，兼容个浏览器
      let scrollList = ['.chatWinLeft', '.chatArea', '.enterMsg']
      initScroll(scrollList)
    })
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chatWin{
    width: 600px;
    height: 350px;
    margin-top:200px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  .chatWinLeft{
    width: 200px;
    height: inherit;
    float: left;
    border: 1px solid palevioletred;
    overflow-y: hidden;
  }
  .chatArea{
    width: 396px;
    height: 240px;
    float: right;
    overflow-y: hidden;
  }
  .enterMsg{
    width: 392px;
    height: 104px;
    float: right;
    resize:none;
    outline: none;
    overflow-y:hidden;
  }
</style>
