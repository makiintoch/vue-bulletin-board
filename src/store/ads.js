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
    ads: [
      {
        id: '1',
        title: 'First ad',
        description: 'Hello i am description',
        promo: false,
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      },
      {
        id: '2',
        title: 'Second ad',
        description: 'Hello i am description',
        promo: true,
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
      },
      {
        id: '3',
        title: 'Third ad',
        description: 'Hello i am description',
        promo: true,
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
      }
    ]
  },
  mutations: {
    create (state, payload) {
      state.ads.push(payload)
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
