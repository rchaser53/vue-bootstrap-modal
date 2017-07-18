const Vue = require('vue')
const modal = require('../../src/index')

const modalB = Vue.extend({
  components: {
    modal
  },
  props:[
    'isShown',
    'modalKey',
    'onClose'
  ],
  template: `<modal v-bind:shown="isShown" effect="fade" v-bind:modal-key="modalKey"
                    v-bind:on-oked="onClose" v-bind:on-closed="onClose" v-bind:ok-text="'custom ok'" v-bind:cancel-text="'custom cancel'">
                <div>modal B</div>
            </modal>`
})

Vue.component('modal-b', modalB)
module.exports = modalB