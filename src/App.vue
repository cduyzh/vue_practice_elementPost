<template>
  <div id="app">
    <leftNav></leftNav>
    <div class="main">
      <router-view/>
    </div>

  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav';
export default {
  name: 'app',
  components: {
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: "Helvetica Neue",
  Helvetica,
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "微软雅黑",
  Arial,
  sans-serif;
}


.main {
  float: left;
  width: 95%;
  background-color: #EFF2F7
}

ul,
li {
  list-style: none
}
</style>
