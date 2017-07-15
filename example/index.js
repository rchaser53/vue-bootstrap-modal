const Vue = require('vue')
const modalA = require('./modals/modalA')
const modalB = require('./modals/modalB')

new Vue({
  el: '#app',
  components: {
    modalA,
    modalB
  },
  data: {
    isShowns: {
      modalA: false,
      modalB: false
    }
  },
  template: `<div>
              <button v-on:click='toggleModal("modalA")'>modalA</button>
              <button v-on:click='toggleModal("modalB")'>modalB</button>
              <modalA modalKey='modalA' v-bind:onClose='onClose' v-bind:isShown='isShowns.modalA' />
              <modalB modalKey='modalB' v-bind:onClose='onClose' v-bind:isShown='isShowns.modalB' />
            </div>`,
  methods: {
    toggleModal(key) {
      Vue.set(this.isShowns, key, !this.isShowns[key])
    },
    onClose(key) {
      Vue.set(this.isShowns, key, false)
    }
  }
})