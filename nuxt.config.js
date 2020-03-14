import colors from 'vuetify/lib/util/colors'
import {getAllPosts} from './utils/prismic'
import axios from "axios";
require('dotenv').config();

module.exports = {
  generate: {
    async routes() {
      const items = await getAllPosts("document.type", "post");
      const categories = await getAllPosts("document.type", "category")
      const posts = await Promise.all(items.results.map(async item => {
        const rateData = await axios.get(`/blog/post/prismic/${item.id}` ,{
          baseURL: process.env.API_URL
        });
        return {
          route: `/story/${item.uid}`,
          payload: {...item, rateData: rateData.data}
        }
      }));
      const allCategories = categories.results.map(item => {
        return {
          route: `/category/${item.uid}`,
          payload: {uid: item.uid, name:item.data.category_name }
        }
      });
      return [...allCategories, ...posts]
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Страшные истории',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Блог о страшных историях.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    baseUrl: process.env.API_URL || 'http://localhost:4000'
  },
  plugins: [
    { src: '~/plugins/clipboard' },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/algolia' }
  ],
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment', '@nuxtjs/dotenv', '@nuxtjs/axios'],
  modules: ['nuxt-webfontloader', '@nuxtjs/sitemap'],
  axios: {
   baseURL:  process.env.baseUrl
  },
  sitemap: {
    hostname: 'https://screep.ru',
    gzip: true
  },
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
