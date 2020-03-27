export default {
  install: (Vue) => {

    const components = require.context('./', false, /\.vue$/)
    components.keys().map(filename => {
      const name = filename.replace(/^\.\//, '').replace(/\.vue$/, '')
      const config = components(filename)

      Vue.component(name, config.default || config)
    })

  }
}
