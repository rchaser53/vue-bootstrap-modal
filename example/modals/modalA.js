const Vue = require('vue')
const modal = require('../../src/index')

module.exports = Vue.extend({
  components: {
    modal
  },
  props:[
    'isShown',
    'modalKey',
    'onClose'
  ],
  template: `<modal v-bind:isShown="isShown" effect="fade"
                    v-bind:modalKey="modalKey" v-bind:onOk="onClose" v-bind:onClose="onClose">
                <div>modal A</div>
            </modal>`
})