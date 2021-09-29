<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #left>
        <van-image
          width="2.5rem"
          fit="cover"
          :src="require('@/assets/logo.png')"
        />
      </template>
      <template #right>
        <van-button
          @click="$router.push('/search')"
          class="search"
          round
          type="info"
          size="small"
          icon="search"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in userList" :key="item.id">
        <NewsList :id="item.id"></NewsList>
      </van-tab>
    </van-tabs>
    <div class="bar-btn">
      <van-icon name="wap-nav" @click="sheetShow = true" />
    </div>
    <div class="tags-controller">
      <van-action-sheet v-model="sheetShow" title="标题">
        <div class="content">
          <TagsController
            :active="active"
            @switchActive="switchActiveFn"
          ></TagsController>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import NewsList from './NewsList.vue'
import TagsController from './TagsController.vue'
import { mapState } from 'vuex'
import { getChannel } from '@/utils/storage'
export default {
  name: 'Home',
  components: {
    NewsList,
    TagsController
  },
  created() {
    if (this.$store.state.user.token.token) {
      this.$store.dispatch('channels/actionGetUserList')
    } else {
      const res = getChannel()
      if (res) {
        this.$store.commit('channels/setUserList', res)
        console.log(res)
      } else {
        this.$store.dispatch('channels/actionGetUserList')
      }
    }
    this.$store.dispatch('channels/actionGetAllList')
  },
  data() {
    return {
      active: 0,
      sheetShow: false
    }
  },
  computed: {
    ...mapState('channels', ['userList'])
  },
  methods: {
    switchActiveFn(index) {
      this.active = index
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
  padding-top: 46px;
  padding-bottom: 50px;
  overflow: hidden;

  // 频道管理的开关按钮
  .bar-btn {
    position: fixed;
    right: 5px;
    top: 57px;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
    z-index: 1;
    .van-icon-wap-nav {
      font-size: 20px;
    }
  }

  .van-tabs {
    height: 100%;
    padding-top: 50px;
    ::v-deep {
      .van-tabs__wrap {
        position: fixed;
        left: 0;
        right: 30px;
        top: 46px;
      }
      .van-tabs__content,
      .van-tab__pane {
        height: 100%;
      }
      .van-tabs__line {
        background-color: #3196fa;
      }
    }
  }

  // 搜索按钮
  .search {
    background-color: #5babfb;
    width: 100px;
    font-size: 14px;
    .van-icon {
      color: #fff;
    }
  }
}
</style>
