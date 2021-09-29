<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button plain size="mini" type="danger" @click="show = !show">{{
          show ? '取消' : '编辑'
        }}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
          v-for="(item, index) in userList"
          :key="item.id"
          @click.stop="switchTag(index)"
        >
          <span :class="{ highlight: active === index }">{{ item.name }}</span>

          <!-- 叉号 -->
          <van-icon
            name="cross"
            class="btn"
            v-show="show"
            v-if="index !== 0"
            @click.stop="delTag(item.id, index)"
          ></van-icon>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item
          v-for="item in getOptional"
          :key="item.id"
          @click="addTag(item)"
        >
          <span>{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { addUserTag, delUserTag } from '@/api/channels'
import { setChannel } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  computed: {
    ...mapState('channels', ['userList']),
    ...mapState('user', ['token']),
    ...mapGetters('channels', ['getOptional'])
  },
  props: ['active'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    ...mapMutations('channels', ['pushUserList', 'setUserList']),
    switchTag(index) {
      this.$emit('switchActive', index)
    },
    async delTag(id, index) {
      if (this.userList.length < 5) {
        return this.$toast('至少保留4个频道')
      }

      const res = this.userList.filter(item => item.id !== id)
      this.setUserList(res)
      if (index === this.active) {
        this.$emit('switchActive', 0)
      }
      if (index < this.active) {
        this.$emit('switchActive', this.active - 1)
      }
      if (this.token.token) {
        await delUserTag(id)
      } else {
        setChannel(res)
      }
    },
    async addTag(item) {
      this.pushUserList(item)
      if (this.token.token) {
        await addUserTag(item.id)
      } else {
        setChannel(this.userList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  padding: 15px;
  font-size: 14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
  .highlight {
    color: red;
  }
}
</style>
