import { customRef } from 'vue'
import { useIndexStore } from '@/store/index.js'

const store = useIndexStore()

export default function(init_value='', delay=1000) {

  let init = init_value

  let timer = null

  return customRef((track, trigger) => {
    return {
      get() {
        // 跟踪一下
        track()
        return init
      },
      set(value) {
        init = value
        // 触发一下
        trigger()

        clearTimeout(timer)
        timer = setTimeout(() => {
          store.update_input_search()
        }, delay)
      }
    }
  })
}
