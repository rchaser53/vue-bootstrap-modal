import Vue from 'vue'
import modal from '../src/index.vue'

new Vue({
  el: '#app',
  data() {
    return {
      isShowns: {
        modalA: false
      }
    }
  },
  components: {
    modal
  },
  template: `<div>
              <button v-on:click='toggleModal("modalA")'>toggle</button>
              <modal v-bind:isShown="isShowns.modalA" effect="fade"
                    v-bind:modalKey="'modalA'" v-bind:onOk="onClose" v-bind:onClose="onClose">
                <div>gya-n</div>
              </modal>
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