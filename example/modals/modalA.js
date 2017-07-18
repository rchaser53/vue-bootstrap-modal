const Vue = require('vue')
const modal = require('../../src/index')

const modalA = Vue.extend({
  components: {
    modal
  },
  props:[
    'isShown',
    'modalKey',
    'onClose'
  ],
  template: `<modal v-bind:shown="isShown" effect="fade" v-bind:modal-key="modalKey"
                    v-bind:on-oked="customOk" v-bind:on-closed="onClose" v-bind:ok-text="'custom ok'" v-bind:cancel-text="'custom cancel'">
                <div>modal A</div>
            </modal>`,
  methods: {
    customOk: function() {
      console.log('ok!')
      this.onClose()
    }
  }
})

Vue.component('modal-a', modalA)
module.exports = modalA