import { defineStore } from 'pinia'

export const useIndexStore = defineStore({
  id: 'index',
  state: () => {
    return {
      input_search: 0
    }
  },
  actions: {
    update_input_search() {
      this.input_search += 1
    }
  }
})
