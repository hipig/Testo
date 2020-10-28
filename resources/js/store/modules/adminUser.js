import * as types from "../mutation-types"
import { login, me, logout } from "@/api/admin/user"

// state
export const state = {
  token: "",
  userInfo: {}
}

// getters
export const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo
}

// mutations
export const mutations = {
  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_USERINFO]: (state, info) => {
    state.userInfo = info
  }
}

// actions
export const actions = {
  // 登录
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(res => {
          commit("SET_TOKEN", res.access_token)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      me()
        .then(res => {
          commit("SET_USERINFO", res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logout({ commit }) {
    return new Promise(resolve => {
      logout()
        .then(() => {
          resolve()
        })
        .catch(() => {
          resolve()
        })
        .then(() => {
          commit("SET_TOKEN", "")
          commit("SET_USERINFO", {})
        })
    })
  },

  clear({ commit }) {
    commit("SET_TOKEN", "")
    commit("SET_USERINFO", {})
  },

  setUserInfo({ commit }, userInfo) {
    commit("SET_USERINFO", userInfo)
  }
}
