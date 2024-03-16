import { render, createVNode } from 'vue'
import WeatherModal from './Index.vue' // v-node

export function weather_modal(args={}) {
  let div = document.createElement('div')

  // createVNode函数 接收的第一个参数为节点标签，可以是VNode
  let v_node = createVNode(WeatherModal, {
    title: args.title,
    city: args.city,
    cancel_text: args.cancel_text,
    confirm_text: args.confirm_text,
    cancel: args.cancel,
    confirm: args.confirm,
    dom: div,
  })
  // render 用于 渲染一个VNode
  render(v_node, div)

  document.querySelector('#app').appendChild(div)
}
