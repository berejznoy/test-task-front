import Vue from 'vue'

Vue.mixin({
	computed: {
		$customTheme(){
			return (this.$vuetify.theme.dark) ? 'dark' : 'light'
		},
	}
});
