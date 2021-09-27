<template>
  <div class="news_list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.art_id" :title="item.title">
          <template #label>
            <van-grid :border="false" :column-num="item.cover.type">
              <van-grid-item
                v-for="(img, index) in item.cover.images"
                :key="index"
              >
                <van-image
                  :src="img"
                  :class="{
                    oneImg: item.cover.type === 1,
                    threeImg: item.cover.type === 3
                  }"
                />
              </van-grid-item>
              <div class="meta">
                <span>作者：{{ item.aut_name }}</span>
                <span>评论数：{{ item.comm_count }}</span>
                <span>{{ item.pubdate | fromNow }}</span>
              </div>
            </van-grid>
          </template></van-cell
        >
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsList } from '@/api/article'
import moment from 'moment'
export default {
  name: 'NewsList',
  props: ['id'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: +new Date(),
      refreshing: false
    }
  },
  methods: {
    async onLoad() {
      try {
        this.loading = true
        const res = await getNewsList(this.id, this.timestamp)
        this.list = [...this.list, ...res.data.results]
        this.timestamp = res.data.pre_timestamp
        this.loading = false
        if (res.data.results.length === 0) {
          this.finished = true
        }
      } catch (e) {}
    },
    async onRefresh() {
      const res = await getNewsList(this.id, Date.now())
      this.list = res.data.results
      this.refreshing = false
    }
  },
  filters: {
    fromNow(val) {
      moment.locale('zh-cn')
      return moment(val, 'YYYY-MM-DD hh:mm:ss').fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.news_list {
  height: 100%;
  overflow-y: scroll;
}
.oneImg {
  height: 180px;
  width: 100%;
}
.threeImg {
  width: 100%;
  height: 80px;
}
.meta span {
  margin-right: 10px;
}
</style>
