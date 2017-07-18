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
              <modal-a modal-key='modalA' v-bind:on-close='onClose' v-bind:is-shown='isShowns.modalA' ></modal-a>
              <modal-b modal-key='modalB' v-bind:on-close='onClose' v-bind:is-shown='isShowns.modalB' ></modal-b>
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