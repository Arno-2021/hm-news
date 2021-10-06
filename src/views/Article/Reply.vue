<template>
  <div class="article-comments">
    <!-- 当前评论 -->
    <van-cell title="当前评论" :border="false">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="currentComment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{
        currentComment.aut_name
      }}</span>
      <div slot="label">
        <p style="color: #363636;">{{ currentComment.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{
            currentComment.pubdate | fromNow
          }}</span>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->
    <van-divider>全部回复</van-divider>

    <!-- 对当前评论 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{
              item.pubdate | fromNow
            }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入回复内容" v-model="content">
        <van-button slot="button" size="mini" type="info" @click="replyFn"
          >发布</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
  </div>
</template>
<script>
import { getReply, commentBelow } from '@/api/article'
export default {
  name: 'CommentReply',
  props: ['currentComment', 'artID'],
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      content: ''
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      const res = await getReply(this.currentComment.com_id, this.offset)
      this.list = [...this.list, ...res.data.results]
      this.offset = res.data.last_id
      this.loading = false
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    async replyFn() {
      const res = await commentBelow({
        target: this.currentComment.com_id,
        content: this.content,
        art_id: this.artID
      })
      this.list.unshift(res.data.new_obj)
      this.content = ''
      this.$emit('fixReplyConut')
    }
  }
}
</script>
<style lang="less" scoped>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
