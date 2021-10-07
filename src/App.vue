<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="this.$route.meta.ifKeepAlive" />
    </keep-alive>
    <router-view v-if="!this.$route.meta.ifKeepAlive" />
  </div>
</template>

<script>
export default {}
</script>
<style lang="less"></style>
