<template>
  <div role="dialog" :class="['modal',effect]" @click="backdrop&&action(false,1)" @transitionend="transition = false">
    <div :class="['modal-dialog', { 'modal-lg': large, 'modal-sm': small }]" role="document" @click.stop="action(null)">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="action(false,2)"><span>&times;</span></button>
            <h4 class="modal-title"><slot name="title">{{title}}</slot></h4>
          </div>
        </slot>
        <slot name="modal-body"><div class="modal-body"><slot></slot></div></slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="action(false,3)">{{ cancelText }}</button>
            <button type="button" class="btn btn-primary" @click="action(true,4)">{{ okText }}</button>
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
    backdrop: {type: Boolean, default: true},
    callback: {type: Function, default: null},
    cancelText: {type: String, default: 'Close'},
    effect: {type: String, default: null},
    large: {type: Boolean, default: false},
    okText: {type: String, default: 'Save changes'},
    small: {type: Boolean, default: false},
    title: {type: String, default: ''},
    value: {type: Boolean, required: true}
  },
  data () {
    return {
      transition: false,
      isShown: false
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

          setTimeout(() => {
            el.classList.add('in')
          }, 0)

          body.classList.add('modal-open')

          if (getScrollBarWidth() === 0) return
          body.style.paddingRight = getScrollBarWidth() + 'px'

        } else {
          el.classList.remove('in')
        }
      }
      //ending
      else {
        this.$emit(this.isShown ? 'opened' : 'closed')

        // i guess isShown never come null or undefined
        if (!this.isShown) {
          el.style.display = 'none'
          body.style.paddingRight = null
          body.classList.remove('modal-open')
        }
      }
    },
    isShown (isShown, old) {
      this.$emit('input', isShown)
      if (old === null ? isShown === true : isShown !== old) {
        Vue.set(this, 'transition', true)
      }
    },
    value (isShown, old) {
      if (isShown === old) return
      Vue.set(this, 'isShown', isShown)
    }
  },
  methods: {
    action (isShown, p) {
      if (isShown && this.callback instanceof Function) this.callback()
      this.$emit(isShown ? 'ok' : 'cancel', p)
      Vue.set(this, 'isShown', isShown || false)
    }
  },
  mounted () {
    Vue.set(this, 'isShown', this.value)
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