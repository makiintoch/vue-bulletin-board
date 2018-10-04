import firebase from 'firebase'

class Ad {
  constructor (title, description, ownerId, src = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    create (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async create ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const ad = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.src,
          payload.promo
        )

        const fbAd = await firebase.database().ref('ads').push(ad)
        commit('setLoading', false)
        commit('create', {
          ...ad,
          id: fbAd.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        console.log(ads)
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(new Ad(
            ad.title,
            ad.description,
            ad.ownerId,
            ad.src,
            ad.promo,
            key
          ))
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    allAds (state) {
      return state.ads
    },
    allPromoAds (state) {
      return state.ads.filter(item => item.promo)
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => state.ads.find(item => item.id === adId)
    }
  }
}
