<template>
  <pages-component :items="items"/>
</template>

<script>
import {getAllPosts} from '../utils/prismic'
import PagesComponent from "../components/commons/PagesComponent";

export default {
	components: {PagesComponent},
	async asyncData() {
		const items = await getAllPosts("document.type", "post");
		return {
			items: items.results
		};
	},
}
</script>

<style scoped>
</style>

