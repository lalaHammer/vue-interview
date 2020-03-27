<template>
  <div class="containter">
    <span class="title"
          v-text="title"></span>
    <i class="icon el-icon-close"
       @click="handleClose"></i>
  </div>
</template>

<script>
export default {
  name: 'in-title',
  props: {
    title: ''
  },
  data () {
    return {

    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.containter {
  padding: 10px;
  overflow: hidden;
  line-height: 30px;
  text-align: left;
}
.title {
  font-weight: 600;
  font-size: 16px;
}
.icon {
  margin-left: 10px;
  float: right;
  font-size: 20px;
  cursor: pointer;
}
</style>