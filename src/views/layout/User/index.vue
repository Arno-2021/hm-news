<template>
  <div class="user">
    <!-- 基本信息 -->
    <div class="user-profile">
      <div class="info">
        <van-image round :src="userInfo.photo" />
        <h3 class="name">
          {{ userInfo.name }}
          <br />
          <van-tag size="mini">{{ userInfo.birthday }}</van-tag>
        </h3>
      </div>
    </div>

    <!-- 操作链接 -->
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />
        我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />
        我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />
        阅读历史
      </van-col>
    </van-row>

    <!-- 编辑入口 -->
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" is-link to="/user/edituserinfo" />
      <van-cell icon="chat-o" title="小智同学" is-link to="/user/chat" />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link @click="logoutFn" />
    </van-cell-group>
  </div>
</template>

<script>
// import { getProfile } from '@/api/user'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'User',
  created() {
    try {
      this.storeGetProfile()
      // const res = await getProfile()
      // this.userInfo = res.data
      // this.storeUserInfo(res.data)
    } catch (e) {}
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['storeGetProfile']),
    ...mapMutations('user', ['removeStoreToken', 'storeUserInfo']),
    async logoutFn() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否确认退出登录'
        })
        this.removeStoreToken()
        this.$router.push('/login')
      } catch (e) {}
    }
  }
}
</script>

<style lang="less" scope>
.user {
  &-profile {
    width: 100%;
    height: 100px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 20px;
      align-items: center;
      .van-image {
        width: 64px;
        height: 64px;
      }
      .name {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p {
      margin: 0;
      text-align: center;
    }
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      padding-bottom: 5px;
    }
  }
}
</style>
