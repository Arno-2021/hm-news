<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="chat-o"
        >问答</van-tabbar-item
      >
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less" scoped></style>
