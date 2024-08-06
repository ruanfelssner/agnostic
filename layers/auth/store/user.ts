import { defineStore } from 'pinia'

export const useMyUserStore = defineStore('myUserStore', {
  state: () => ({
    name: 'Eduardo',
    email: 'eduardo@eduardo.com'
  }),
  actions: {}
})