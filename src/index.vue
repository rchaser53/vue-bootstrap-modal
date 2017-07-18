<template>
   <div role="dialog" :class="['modal', effect]" @transitionend="transition = false" @click="closeDialog(['closed'])">
    <div class="modal-dialog" role="document" @click.stop="stopEvent()">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="closeDialog(['closed'])"><span>&times;</span></button>
            <h4 class="modal-title"><slot name="title">{{title}}</slot></h4>
          </div>
        </slot>
        <slot name="modal-body"><div class="modal-body"><slot></slot></div></slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="closeDialog(['closed'])">{{ cancelText }}</button>
            <button type="button" class="btn btn-primary" @click="closeDialog(['closed', 'oked'])">{{ okText }}</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

const innerStyle = {
  width: '100%',
  height: '200px'
}

const outerStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  visibility: 'hidden',
  width: '200px',
  height: '150px',
  overflow: 'hidden'
}

function getScrollBarWidth () {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight

  if (scrollHeight <= clientHeight) return 0

  let inner = document.createElement('p')
  let outer = document.createElement('div')
  inner.style = innerStyle
  outer.style = outerStyle;

  outer.appendChild(inner)
  document.body.appendChild(outer)
  let w1 = inner.offsetWidth
  let w2 = inner.offsetWidth
  
  outer.style.overflow = 'scroll'
  if (w1 === w2) w2 = outer.clientWidth

  document.body.removeChild(outer)

  return (w1 - w2)
}
export default {
  props: {
    'modal-key': { type: String },
    'on-oked': { type: Function, default: function(){} },
    'on-closed': { type: Function, default: function(){} },
    'cancel-text': { type: String, default: 'Close' },
    'ok-text': { type: String, default: 'Save changes' },
    shown: {type: Boolean, required: true },
    effect: { type: String, default: null },
    title: { type: String, default: '' },
  },
  data () {
    return {
      transition: false
    }
  },
  watch: {
    transition (shown, old) {
      if (shown === old) return
      const el = this.$el
      const body = document.body

      //starting
      if (shown) {
        if (this.shown) {
          el.querySelector('.modal-content').focus()
          el.style.display = 'block'
          body.classList.add('modal-open')

          setTimeout(() => {
            el.classList.add('in')
          }, 0)

          if (getScrollBarWidth() === 0) return
          body.style.paddingRight = getScrollBarWidth() + 'px'

        } else {
          el.classList.remove('in')
        }
      }
      //ending
      else {
        if (!this.shown) {
          el.style.display = 'none'
          body.style.paddingRight = null
          body.classList.remove('modal-open')
        }
      }
    },
    shown (shown, old) {
      if (old === null ? shown === true : shown !== old) {
        Vue.set(this, 'transition', true)
      }
    }
  },
  methods: {
    stopEvent () {
      // this function is only for @click.stop
    },
    closeDialog(keys) {
      keys.forEach((key) => {
        this.$emit(key)
      })
    }
  },
  ready: function() {
    this.$on('closed', this.onClosed.bind(this, this.modalKey))
    this.$on('oked', this.onOked.bind(this, this.modalKey))
  }
}
</script>
<style>
  .modal {
    transition: all 0.3s ease;
  }
  .modal.in {
    background-color: rgba(0,0,0,0.5);
  }
  .modal.zoom .modal-dialog {
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    transition: all 0.3s;
  }
  .modal.zoom.in .modal-dialog {
    transform: scale(1);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
  }
</style>