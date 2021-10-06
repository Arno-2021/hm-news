<template>
  <div class="edit">
    <!-- 导航条 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
    ></van-nav-bar>

    <!-- 头像部分 -->
    <div class="avatar">
      <van-image fit="cover" round :src="userInfo.photo" />
    </div>

    <!-- 信息展示 -->
    <van-cell-group>
      <van-cell
        is-link
        title="名称"
        :value="userInfo.name"
        @click="popupEditNickName"
      />
      <van-cell
        is-link
        title="性别"
        :value="userInfo.gender === 1 ? '女' : '男'"
      />
      <van-cell is-link title="生日" :value="userInfo.birthday" />
    </van-cell-group>
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="subEditNickName"
    >
      <van-field v-model="value" placeholder="请输入用户名" />
    </van-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { subEdit } from '@/api/user'
export default {
  name: 'Edit',
  data() {
    return {
      show: false,
      value: ''
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['storeGetProfile']),
    popupEditNickName() {
      this.show = true
      this.value = this.userInfo.name
    },
    async subEditNickName() {
      await subEdit({ name: this.value })
      this.$toast.success('昵称修改成功')
      this.storeGetProfile()
    }
  },
  created() {
    this.storeGetProfile()
  }
}
</script>
<style lang="less" scoped>
.edit {
  ::v-deep {
    .van-dialog__content {
      padding: 10px;
      .van-field {
        border-radius: 5px;
        border: 1px solid #ccc;
      }
    }
  }
}

.avatar {
  padding: 20px 0;
  text-align: center;
  position: relative;
  .van-image {
    width: 120px;
    height: 120px;
  }
  .upload {
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
    ::v-deep {
      .van-uploader__input {
        width: 120px;
        height: 120px;
      }
    }
  }
}

// 使用vue-cropper插件，必须指定父盒子的宽度和高度
.demo {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .confirm,
  .cancel {
    position: absolute;
    bottom: 0;
  }
  .confirm {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
</style>
