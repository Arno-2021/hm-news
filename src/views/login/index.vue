<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="tel"
        label="手机号"
        required
        placeholder="请输入手机号"
        :rules="rules.tel"
      />
      <van-field
        v-model="code"
        type="number"
        required
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { getToken } from '@/utils/storage'
export default {
  name: 'Login',
  data() {
    return {
      tel: '17628281305',
      code: '246810',
      rules: {
        tel: [
          { required: true, message: '请填写用户名' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        code: [
          { required: true, message: '请填写密码' },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.tel, this.code)
        // setToken(res.data.token)
        this.$toast.success('登录成功')
        this.$store.commit('user/setStoreToken', res.data)
        this.$router.push('/')
      } catch (e) {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
