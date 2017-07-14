import Vue from 'vue'
import modal from './index.vue'

new Vue({
  el: '#app',
  data() {
    return {
      isShown: false
    }
  },
  components: {
    modal
  },
  template: `<div>
              <button v-on:click='toggleModal'>toggle</button>
              <modal v-bind:value="isShown" effect="fade" v-bind:onOk="onClose" v-bind:onClose="onClose">
                <div>gya-n</div>
              </modal>
            </div>`,
  methods: {
    toggleModal() {
      Vue.set(this, 'isShown', !this.isShown)
    },
    onClose() {
      Vue.set(this, 'isShown', false)
    }
  }
})