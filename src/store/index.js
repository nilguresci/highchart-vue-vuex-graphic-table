import { createStore } from 'vuex'
import userService from '../services/user.service.js'
import { cloneDeep } from 'lodash'
export default createStore({
  state() {
    return {
      count: 0,
      myValue: null,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        store: [
          {
            storeName: '',
            storeId: '',
            marketplaceName: ''
          }
        ]
      },
      selectedColumnDates: [],
      lastDayNumber: 30
    }
  },
  getters: {
    getSelectedColumnDates(state) {
      return state.selectedColumnDates
    },
    getLastDayNumber(state) {
      return state.lastDayNumber
    },
    getUserInfoState(state) {
      return state.user
    }
  },
  mutations: {
    setLastDayNumber(state, payload) {
      state.lastDayNumber = payload
    },
    getUserInformation(state, payload) {
      state.user = payload
    },
    setSelectedDays(state, payload) {
      const dates = cloneDeep(state.selectedColumnDates)
      if (dates.length >= 2) {
        dates[0] = dates[1]
        dates[1] = payload
      } else {
        dates.push(payload)
      }
      state.selectedColumnDates = dates
    }
  },
  actions: {
    setUserInformation({ commit }) {
      userService.getUserInfo().then(
        (res) => {
          if (res.data.Data.user) {
            commit('getUserInformation', res.data.Data.user)
          }
        },
        (err) => {
          console.log('User information cannot get.', err)
        }
      )
    }
  }
})
