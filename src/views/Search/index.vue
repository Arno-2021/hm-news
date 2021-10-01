<template>
  <div class="search">
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.back()"
      fixed
    ></van-nav-bar>

    <!-- 搜索框 -->
    <van-search
      v-model="keyword"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @input="inputFn"
      @search="onSearch(keyword)"
    >
      <template #action>
        <div @click="onSearch(keyword)">搜索</div>
      </template>
    </van-search>

    <!-- 推荐 -->
    <van-cell-group v-if="keyword">
      <van-cell
        icon="search"
        v-for="item in suggetList"
        :key="item"
        @click="selectKeyword(item)"
        ><span v-html="highlight(item, keyword)"></span
      ></van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录"></van-cell>
      <van-cell :title="item" v-for="item in history" :key="item">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggetion } from '@/api/search'
export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      suggetList: [],
      history: []
    }
  },
  methods: {
    highlight(str, keyword) {
      return str.replace(
        new RegExp(keyword, 'gi'),
        item => `<span style='color: red'>${item}</span></span>`
      )
    },
    onSearch(keyword) {
      this.$router.push({
        path: 'search/results',
        query: {
          keyword
        }
      })
      this.history.push(keyword)
    },
    selectKeyword(keyword) {
      this.$router.push({
        path: 'search/results',
        query: {
          keyword
        }
      })
      this.history.push(keyword)
    },
    inputFn() {
      clearTimeout(this.timerId)
      this.timerId = setTimeout(async () => {
        if (this.keyword) {
          const res = await getSuggetion(this.keyword)
          this.suggetList = res.data.options
        } else {
          this.suggetList = []
        }
      }, 400)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 50px;
}
</style>
