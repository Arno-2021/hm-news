<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id">
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
            <van-button size="mini" type="default" @click="showReplyFn(item)"
              >回复({{ item.reply_count }})</van-button
            >
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="item.is_liking ? 'like' : 'like-o'"
          @click="likeFn(item)"
        />
      </van-cell>
    </van-list>
    <!-- /评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容" v-model="content">
        <van-button slot="button" size="mini" type="info" @click="pubComment"
          >发布</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <van-action-sheet v-model="replyShow" title="评论回复" show-cancel-button>
      <Reply
        :currentComment="currentComment"
        :artID="artID"
        v-if="replyShow"
        @fixReplyConut="fixReplyConutFn"
      ></Reply>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  getComment,
  commentBelow,
  likeComment,
  dislickComment
} from '@/api/article'
import Reply from './Reply.vue'
export default {
  name: 'ArticleComment',
  props: ['artID'],
  components: {
    Reply
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      content: '',
      replyShow: false,
      currentComment: ''
    }
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      const res = await getComment(this.artID, this.offset)
      this.list = [...this.list, ...res.data.results]
      this.offset = res.data.last_id
      this.loading = false
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    async pubComment() {
      const res = await commentBelow({
        target: this.artID,
        content: this.content
      })
      this.$toast('评论成功')
      this.content = ''
      this.list.unshift(res.data.new_obj)
    },
    async likeFn(val) {
      if (val.is_liking) {
        await dislickComment(val.com_id)
        this.$toast('取消点赞成功')
      } else {
        await likeComment(val.com_id)
        this.$toast('点赞成功')
      }
      val.is_liking = !val.is_liking
    },
    showReplyFn(item) {
      this.replyShow = true
      this.currentComment = item
    },
    fixReplyConutFn() {
      this.currentComment.reply_count++
    }
  }
}
</script>

<style scoped lang="less">
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
