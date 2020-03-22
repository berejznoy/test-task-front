import colors from "vuetify/lib/util/colors"
require("dotenv").config();

export default {
	/*
  ** Headers of the page
  */
	head: {
		title: "Test task front",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "Test task front" }
		],
	},
	env: {
		baseUrl: process.env.API_URL || "http://localhost:4000"
	},
	buildModules: ["@nuxtjs/vuetify", "@nuxtjs/dotenv", "@nuxtjs/axios",],
	modules: ["nuxt-webfontloader",  "@nuxtjs/auth"],
	axios: {
		baseURL:  process.env.baseUrl
	},
	webfontloader: {
		google: {
			families: ["Montserrat:400,500,600,700,800&display=swap&subset=cyrillic"]
		}
	},
	plugins: [
		{ src: "~/plugins/mixins" }
	],
	vuetify: {
		/* module options */
		customVariables: ["~/assets/variables.scss"],
		theme: {
			dark: false
		},
		defaultAssets: {
			font: false
		},
		treeShake: true,
	},
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: { url: "/signin", method: "post", propertyName: "accessToken" },
					logout: { url: "/logout", method: "get" },
					user: { url: "/info", method: "get", propertyName: "id" }
				},
				tokenRequired: true,
				tokenType: "bearer"
			}
		}
	},
	router: {
		middleware: ["auth"]
	},
	/*
  ** Customize the progress bar color
  */
	loading: {
		color: "red"
	},
	/*
  ** Build configuration
  */
	build: {
		transpile: ["vue-instantsearch", "instantsearch.js/ru"],
		/*
    ** Run ESLint on save
    */
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({enforce: "pre",
					test: /\.(js|vue)$/,
					loader: "eslint-loader",
					exclude: /(node_modules)/
				})
			}
		}
	}
}
