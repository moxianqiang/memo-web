<template>
  <div class="app-wrapper">
<!--    <nav>-->
<!--      <router-link to="/">登录</router-link> |-->
<!--      <router-link to="/home">主页</router-link>-->
<!--    </nav>-->
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  margin: 0;
  padding: 0;
}

.app-wrapper {
  width: 100%;
  //height: 800px;
  height: 100vh;
  background-color: #fff;
  margin: 0 auto;
}
</style>
