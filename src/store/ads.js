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
    create ({commit}, payload) {
      payload.id = `${Math.random()}`

      commit('create', payload)
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
