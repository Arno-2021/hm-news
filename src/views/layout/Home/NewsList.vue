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
                <span
                  class="close"
                  v-if="token.token"
                  @click="popupShowFn(item.art_id)"
                >
                  <van-icon name="cross" lazy-load />
                </span>
              </div>
            </van-grid> </template
        ></van-cell>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="popupShow" style="width: 60%">
      <!-- 一级选项 -->
      <van-cell-group v-if="vanShow">
        <van-cell @click="dislikeFn">不感兴趣</van-cell>
        <van-cell is-link @click="vanShow = false">反馈垃圾内容</van-cell>
      </van-cell-group>
      <!-- 二级选项 -->
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="vanShow = true">返回</van-cell>
        <van-cell
          v-for="item in reports"
          :key="item.value"
          @click="reportFn(item.value)"
          >{{ item.label }}</van-cell
        >
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { getNewsList } from '@/api/article'
import { dislikeArticle, reportArticle } from '@/api/channels'
import { mapState } from 'vuex'
import reports from '@/api/constant/reports'
export default {
  name: 'NewsList',
  props: ['id'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: +new Date(),
      refreshing: false,
      popupShow: false,
      vanShow: true,
      artID: '',
      reports
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
    },
    async dislikeFn() {
      try {
        await dislikeArticle(this.artID)
        this.popupShow = false
        this.$toast.success('操作成功')
        const res = this.list.filter(item => item.art_id !== this.artID)
        this.list = res
      } catch (e) {
        this.$toast.fail('操作失败')
      }
    },
    async reportFn(type) {
      try {
        await reportArticle(this.artID, type)
        const res = this.list.filter(item => item.art_id !== this.artID)
        this.list = res
        this.$toast.success('操作成功')
        this.popupShow = false
        this.vanShow = true
      } catch (e) {
        this.$toast.fail('操作失败')
      }
    },
    popupShowFn(id) {
      this.popupShow = true
      this.artID = id
    }
  },
  computed: {
    ...mapState('user', ['token'])
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
.meta {
  width: 100%;
}
.meta span {
  margin-right: 10px;
}
.close {
  float: right;
}
</style>
