import colors from 'vuetify/lib/util/colors'
import Prismic from "prismic-javascript";
import { apiEndpoint } from "./config/prismic.config";
require('dotenv').config()

module.exports = {
  generate: {
    async routes() {
      const api = await Prismic.getApi(apiEndpoint);
      const items = await api.query(
        Prismic.Predicates.at("document.type", "post")
      );
      return items.results.map(item => {
        return {
          route: `/story/${item.uid}`
        }
      })
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'screep',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Blog about creepy stories' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  plugins: [
    { src: '~/plugins/clipboard' },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/algolia' }
  ],
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment', '@nuxtjs/dotenv'],
  modules: ['nuxt-webfontloader'],
  webfontloader: {
    google: {
      families: ['Montserrat:400,500,600,700,800&display=swap&subset=cyrillic']
    }
  },
  vuetify: {
    /* module options */
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          background: colors.grey.lighten3,
          menu: colors.grey.lighten4,
          card: colors.grey.lighten4,
          color: colors.grey.darken4
        }
      }
    },
    defaultAssets: {
      font: false
    },
    treeShake: true,
  },

  /*
  ** Customize the progress bar color
  */
  loading: {
    color: 'red'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/ru'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
