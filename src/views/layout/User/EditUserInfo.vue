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
      <van-image fit="cover" round :src="userInfo.photo" @click="chooseFile" />
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
        @click="popupGender"
      />
      <van-cell
        is-link
        title="生日"
        :value="userInfo.birthday"
        @click="popupBirthday"
      />
    </van-cell-group>
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="subEditNickName"
    >
      <van-field v-model="value" placeholder="请输入用户名" ref="nameIpt" />
    </van-dialog>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        :default-index="gender"
      />
    </van-popup>
    <van-popup v-model="showBirthday" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday = false"
        @confirm="editBrithday"
      />
    </van-popup>
    <van-uploader :after-read="afterRead" ref="uploader" v-show="false" />
    <div class="cropper" v-if="showCropper">
      <VueCropper
        ref="cropper"
        :img="img"
        autoCrop
        autoCropWidth="120"
        autoCropHeight="120"
        centerBox
        fixed
      ></VueCropper>
      <van-button type="primary" class="confirm" @click="crop">确认</van-button
      ><van-button type="primary" class="cancel" @click="showCropper = false"
        >取消</van-button
      >
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { mapState, mapActions } from 'vuex'
import { subEdit, editAvatar } from '@/api/user'
import moment from 'moment'
// import moment from 'moment'
export default {
  name: 'Edit',
  components: {
    VueCropper
  },
  data() {
    return {
      show: false,
      value: '',
      showPicker: false,
      columns: ['男', '女'],
      showBirthday: false,
      minDate: new Date('1950/1/1'),
      maxDate: new Date(),
      currentDate: '',
      gender: '',
      showCropper: false,
      img: ''
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
      this.$nextTick(() => {
        this.$refs.nameIpt.focus()
      })
    },
    async subEditNickName() {
      await subEdit({ name: this.value })
      this.$toast.success('昵称修改成功')
      this.storeGetProfile()
    },
    popupGender() {
      this.gender = '' + this.userInfo.gender
      this.showPicker = true
    },
    async onConfirm(val) {
      if (val === '男') {
        await subEdit({ gender: '0' })
      } else {
        await subEdit({ gender: '1' })
      }
      this.storeGetProfile()

      this.showPicker = false
    },
    popupBirthday() {
      this.showBirthday = true
      this.currentDate = new Date(this.userInfo.birthday)
    },
    async editBrithday(val) {
      await subEdit({
        birthday: moment(val).format('YYYY-MM-DD')
      })
      this.showBirthday = false
      this.storeGetProfile()
    },
    afterRead(file) {
      this.img = file.content
      this.showCropper = true
    },
    chooseFile() {
      this.$refs.uploader.chooseFile()
    },
    crop() {
      this.$refs.cropper.getCropBlob(async data => {
        const fd = new FormData()
        fd.append('photo', data)
        await editAvatar(fd)
        this.showCropper = false
        this.storeGetProfile()
      })
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
.cropper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.confirm {
  position: absolute;
  bottom: 0;
  left: 0;
}
.cancel {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
