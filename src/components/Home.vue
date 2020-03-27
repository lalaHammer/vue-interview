<template>
  <div class="container">
    <div class="tabs">
      <div class="tab-item"
           v-for="item of tabsList"
           :key="item.type"
           :class="{'selected': currentEdit.tab === item.type }"
           @click="onOpenSiderbar(item)">{{ item.label }}</div>
    </div>
    <div v-for="(temp, key) of template"
         :key="key">
      <div class="home"
           v-if="key === 'home'">
        <img :src="displayData.home.src"
             class="pic">
        <template v-for="comp of temp">
          <p :key="comp.name"
             v-if="!comp.hidden"
             :class=[comp.name]>
            {{ comp['value'] }}
          </p>
        </template>
      </div>
      <div class="about"
           v-if="key === 'about'">
        <i class="top-tip tip-icon el-icon-circle-plus"></i>
        <i class="bottom-tip tip-icon el-icon-circle-plus"></i>
        <i class="icon el-icon-warning-outline"></i>
        <template v-for="comp of temp">
          <p :key="comp.name"
             v-if="!comp.hidden"
             :class=[comp.name]>
            {{ comp['value'] }}
          </p>
        </template>
      </div>
      <div class="book"
           v-if="key === 'book'">
        <img :src="displayData.book.src"
             class="pic">
        <template v-for="comp of temp">
          <p :key="comp.name"
             v-if="!comp.hidden"
             :class=[comp.name]>
            {{ comp['value'] }}
          </p>
        </template>
      </div>
    </div>

    <transition name="slide-fade">
      <div class="drawer"
           v-show="isShowDrawer">
        <create-builder :template="template[currentEdit.tab]"
                        :title="currentEdit.title"
                        :close-on-press-escape="false"
                        @change="onChange"></create-builder>
      </div>
    </transition>
    <!-- <el-drawer title=""
               direction="ltr"
               :visible.sync="isShowDrawer"
               :with-header="false"
               :modal="false">
      <create-builder :template="template[currentEdit.tab]"
                      :title="currentEdit.title"
                      :close-on-press-escape="false"
                      @change="onChange"></create-builder>
    </el-drawer> -->
  </div>
</template>

<script>

import Template from './template'
import CreateBuilder from './create-builder'
export default {
  name: 'Home',
  components: {
    'create-builder': CreateBuilder
  },
  data () {
    return {
      tabsList: [
        { label: 'Home', type: 'home', title: 'HOME' },
        { label: 'Book Online', type: 'book', title: 'BOOK ONLINE' },
        { label: 'About', type: 'about', title: 'ABOUT' },
      ],
      displayData: {},
      isShowDrawer: false,
      currentEdit: {
        tab: '',
        title: ''
      },
      template: {}
    }
  },

  created () {
    this.initData()
  },

  methods: {

    initData () {
      let displayData = {
        home: {
          src: 'https://s1.ax1x.com/2020/03/26/G9MMP1.jpg',
          title: 'DREAMER',
          subtitle: 'Here I Am'
        },
        about: {
          title: 'GETTING STAREDWWW',
          subtitle: 'The Roots',
          description: 'Youth means a temperamental predominance of courage over timidity, of the appetite for adventure over the love of ease. This often exits in a man of 60, more than a boy of 20.nobody grows merely by the number of years; we grow old by deserting our ideas. Years may wrinkle the skin, but to give up enthusiasm wrinkles the soul. Worry, fear, self-distrust1 bows the heart and turns the spirit back to dust.'
        },
        book: {
          src: 'https://s1.ax1x.com/2020/03/26/G9JvAU.md.jpg',
          subtitle: 'Your Go-To Source',
          title: 'DREAMER'
        }
      }
      for (let key in displayData) {
        for (let i of Template[key]) {
          if (displayData[key][i.name]) {
            i['value'] = displayData[key][i.name]
            i['default'] = displayData[key][i.name]
            i['hidden'] = false
          }
        }
      }
      this.displayData = displayData
      this.template = Template
      this.currentEdit.tab = 'home'
    },

    onOpenSiderbar (tab) {
      this.currentEdit.tab = tab.type
      this.currentEdit.title = tab.title
      this.isShowDrawer = true
    },

    getTitle (title) {
      return title.to
    },

    onChange (value) {
      let tab = this.currentEdit.tab
      let template = this.template
      for (let key in template) {
        if (tab === key) {
          for (let item of template[key]) {
            item = Object.assign(item, value[item.name])
          }
        }
      }
      this.template = template
      this.isShowDrawer = false
    }

  }
}
</script>

<style scoped>
.container {
  background: #000;
  width: 100%;
}

.tabs {
  padding-left: 50px;
  overflow: hidden;
  line-height: 40px;
}
.tabs .tab-item {
  float: left;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  margin-right: 20px;
}
.tabs .tab-item.selected {
  color: #67c23a;
}

.home {
  padding: 20px;
  text-align: center;
  color: #fff;
}
.home .pic {
  width: 100px;
  height: 70px;
}
.home .title {
  font-size: 18px;
  font-weight: 800;
  margin: 8px 0;
}
.home .subtitle {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 10px;
}

.about {
  background: #42dbba;
  position: relative;
  padding: 40px 0;
  text-align: center;
}
.about .icon {
  font-size: 50px;
  color: #000;
  margin-bottom: 15px;
}
.about .tip-icon {
  position: absolute;
  font-size: 40px;
  left: 50%;
  color: #409eff;
}
.about .top-tip {
  top: 0;
  transform: translate(-50%, -50%);
}
.about .bottom-tip {
  bottom: 0;
  transform: translate(-50%, 50%);
}

.about .title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 10px;
}
.about .subtitle {
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
}
.about .discription {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 14px;
}

.book {
  padding: 40px 20px;
}
.book .pic {
  width: 100%;
  margin-bottom: 10px;
}
.book .subtitle {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  font-style: italic;
}
.book .title {
  font-size: 70px;
  color: #42db79;
  font-weight: 800;
  margin-bottom: 40px;
}

.drawer {
  position: absolute;
  z-index: 10;
  width: 300px;
  height: 100%;
  background: #fff;
  top: 0;
  left: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>