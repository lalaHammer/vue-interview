<template>
  <div class="container">
    <el-form :form="form">
      <div class="header">
        <span class="title">{{ title }}</span>
        <el-checkbox class="checked"
                     v-model="form.isChecked"
                     @change="emitInput"></el-checkbox>
      </div>
      <el-input class="input"
                v-model="form.inputValue"
                :type="_type"
                autosize
                resize="none"
                @input="emitInput"></el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'in-input',
  props: {
    value: '',
    title: '',
    type: '',
    hidden: {
      type: Boolean,
      default: false
    },
    default: null,
  },
  data () {
    return {
      form: {
        isChecked: true,
        inputValue: ''
      }
    }
  },
  watch: {
    hidden (val) {
      this.form.isChecked = !val
    },

    default (val) {
      this.initDefault()
    }
  },
  computed: {
    _type () {
      return this.type
    }
  },
  created () {
    this.initDefault()
    this.emitInput()
  },

  methods: {
    initDefault () {
      if (this.default) {
        this.form.inputValue = this.default
      }
    },

    emitInput () {
      let form = this.form
      this.$emit('change', {
        value: form.inputValue,
        hidden: !form.isChecked
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}
.header {
  line-height: 30px;
  overflow: hidden;
}
.header .title {
  color: #409eff;
  float: left;
}
.header .checked {
  float: right;
}
.input >>> .el-input__inner,
.input >>> .el-textarea__inner {
  border-width: 0;
  border-bottom-width: 1px;
  border-radius: 0;
}
</style>