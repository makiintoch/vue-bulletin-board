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
  mutations: {},
  actions: {},
  getters: {
    getAllAds (state) {
      return state.ads
    },
    getAllPromoAds (state) {
      return state.ads.filter(item => item.promo)
    },
    getMyAds (state) {
      return state.ads
    }
  }
}
