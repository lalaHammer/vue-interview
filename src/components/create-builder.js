const createBuild = {
  name: 'create-builder',
  props: {
    template: {
      type: Array,
      default: []
    },
    title: ''
  },
  data() {
    return {
      data: {}
    }
  },

  render() {
    let content = this.createContent()
    return content
  },

  created() {

  },

  methods: {
    createContent() {
      let slot = []
      let titleNode = this.$createElement('in-title', {
        props: {
          title: this.title
        },
        on: {
          'close': () => {
            this.emitInput()
          }
        }
      })
      slot.push(titleNode)
      for (let i in this.template) {
        let block = this.template[i]
        let blockComponent = this.createComponent(block)
        slot.push(blockComponent)
      }
      return this.$createElement('div', {
        class: 'drawer-content'
      }, slot)
    },

    createComponent(block) {
      let opt = {
        props: {
          value: block.value,
          title: block.title,
          hidden: block.hidden,
          default: block.default,
          type: block.type
        },
        on: {
          'change': data => {
            this.changeValue(block.name, data);
          }
        }
      }
      return this.$createElement(block.component, opt)
    },

    changeValue(name, data) {
      this.data[name] = data
    },

    emitInput() {
      this.$emit('change', this.data)
    }

  }

}

export default createBuild
