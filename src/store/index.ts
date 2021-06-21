import { createStore } from 'vuex'

export default createStore({
  state: {
    guilds: [],
    user: {},
    selected_guild: {}
  },
  mutations: {
    setGuilds (state, guilds) {
      state.guilds = guilds
    },
    setUsername (state, user) {
      state.user = user
    },
    setSelectedGuild ( state, selected_guild) {
      state.selected_guild = selected_guild 
    }
  },
  actions: {
    GUILDS (context, payload) {
      context.commit('setGuilds', payload)
    },
    USERNAME (context, payload) {
      context.commit('setUsername', payload)
    },
    SELECTED_GUILD ( context, payload) {
      context.commit('setSelectedGuild', payload)
    }
  },
  modules: {
  }
})
