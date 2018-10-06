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
    },
    updateAd (state, {id, title, description}) {
      const ad = state.ads.find(item => item.id === id)
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async create ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const ad = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )

        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fbAd = await firebase.database().ref('ads').push(ad)
        const fileData = await firebase.storage().ref(`ads/${fbAd.key}.${imageExt}`).put(image)
        const src = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await firebase.database().ref('ads').child(fbAd.key).update({src})

        commit('setLoading', false)
        commit('create', {
          ...ad,
          id: fbAd.key,
          src
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
    },
    async updateAd ({commit}, {id, title, description}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await firebase.database().ref('ads').child(id).update({
          title,
          description
        })
        commit('updateAd', {
          id, title, description
        })
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
    myAds (state, getters) {
      return state.ads.filter(item => item.ownerId === getters.user.id)
    },
    adById (state) {
      return adId => state.ads.find(item => item.id === adId)
    }
  }
}
