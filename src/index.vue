<template>
   <div role="dialog" :class="['modal', effect]" @transitionend="transition = false" @click="closeDialog(['close'])">
    <div class="modal-dialog" role="document" @click.stop="stopEvent()">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="closeDialog(['close'])"><span>&times;</span></button>
            <h4 class="modal-title"><slot name="title">{{title}}</slot></h4>
          </div>
        </slot>
        <slot name="modal-body"><div class="modal-body"><slot></slot></div></slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="closeDialog(['close'])">{{ cancelText }}</button>
            <button type="button" class="btn btn-primary" @click="closeDialog(['close', 'ok'])">{{ okText }}</button>
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
    modalKey: { type: String },
    isShown: {type: Boolean, required: true },
    onOk: { type: Function, default: function(){} },
    onClose: { type: Function, default: function(){} },
    cancelText: { type: String, default: 'Close' },
    okText: { type: String, default: 'Save changes' },
    effect: { type: String, default: null },
    title: { type: String, default: '' },
  },
  data () {
    return {
      transition: false
    }
  },
  watch: {
    transition (isShown, old) {
      if (isShown === old) return
      const el = this.$el
      const body = document.body

      //starting
      if (isShown) {
        if (this.isShown) {
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
        if (!this.isShown) {
          el.style.display = 'none'
          body.style.paddingRight = null
          body.classList.remove('modal-open')
        }
      }
    },
    isShown (isShown, old) {
      if (old === null ? isShown === true : isShown !== old) {
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
  mounted () {
    this.$on('close', this.onClose.bind(this, this.modalKey))
    this.$on('ok', this.onOk.bind(this, this.modalKey))
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