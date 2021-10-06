<template>
  <div class="article">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>

    <!--loading-->
    <div class="loading" v-if="!article">
      <van-loading class="inner" type="spinner" color="#1989fa" />
    </div>

    <!-- 文章详情 -->
    <div class="detail" v-else>
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="article.aut_photo"
        />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate | fromNow }}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="followFn(article.is_followed, article.aut_id)"
          >{{ article.is_followed ? '取消关注' : '+ 关注' }}</van-button
        >
      </div>
      <div class="content">
        <div v-html="article.content"></div>
      </div>

      <!--分割线-->
      <van-divider>END</van-divider>

      <!--按钮-->
      <div class="btns">
        <van-button
          round
          size="small"
          hairline
          type="primary"
          plain
          icon="good-job-o"
          @click="likeFn"
        >
          {{ article.attitude === 1 ? '取消点赞' : '点赞' }}
        </van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete-o"
        >
          不喜欢
        </van-button>
      </div>
    </div>
    <Comment :artID="this.$route.params.id"></Comment>
  </div>
</template>

<script>
import {
  getArticleContent,
  followAut,
  unfollowAut,
  likeArticle,
  dislikeArticle
} from '@/api/article'
import Comment from './Comment.vue'
export default {
  name: 'HmNewsSearchcontent',
  components: {
    Comment
  },
  async created() {
    const res = await getArticleContent(this.$route.params.id)
    this.article = res.data
  },

  data() {
    return {
      article: ''
    }
  },

  mounted() {},

  methods: {
    async followFn(follow, autId) {
      if (this.$store.state.user.token.token) {
        if (!follow) {
          try {
            await followAut(autId)
            this.article.is_followed = true
            this.$toast.success('关注成功')
          } catch (e) {}
        } else {
          try {
            await unfollowAut(autId)
            this.$toast.success('取消关注成功')
            this.article.is_followed = false
          } catch {}
        }
      } else {
        this.$router.push({
          path: '/login',
          query: {
            back: this.$route.fullPath,
            flag: true
          }
        })
      }
    },
    async likeFn() {
      if (this.$store.state.user.token.token) {
        if (this.article.attitude === -1) {
          await likeArticle(this.article.art_id)
          this.article.attitude = 1
        } else {
          await dislikeArticle(this.article.art_id)
          this.article.attitude = -1
        }
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size: 14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    ::v-deep img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
  .btns {
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
}
</style>
