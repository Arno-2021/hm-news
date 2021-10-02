<template>
  <div class="results">
    <van-nav-bar
      :title="`${$route.query.keyword}的搜索结果`"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in resultsList"
        :key="item.art_id"
        :title="item.title"
        @click="processContent(item.art_id)"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'HmNewsResults',

  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      resultsList: []
    }
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onLoad() {
      const res = await getSearchResults(this.page, this.$route.query.keyword)
      this.resultsList = [...this.resultsList, ...res.data.results]
      this.page++
      if (res.data.results.length === 0) {
        this.finished = true
      }
      this.loading = false
    },
    processContent(id) {
      this.$router.push(`/search/results/searchcontent/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.results {
  padding-top: 50px;
}
</style>
