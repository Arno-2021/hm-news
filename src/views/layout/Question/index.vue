<template>
  <div>
    <VueCropper
      ref="cropper"
      img="https://img01.yzcdn.cn/vant/cat.jpeg"
      autoCrop
      autoCropWidth="120"
      autoCropHeight="120"
      centerBox
      fixed
    ></VueCropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'Question',
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
