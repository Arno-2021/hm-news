<template>
  <div class="results">
    <van-nav-bar
      :title="`${$route.query.keyword}的搜索结果`"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
  </div>
</template>

<script>
export default {
  name: 'HmNewsResults',

  data() {
    return {}
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.results {
  padding-top: 50px;
}
</style>
