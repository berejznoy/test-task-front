<template>
    <pages-component :items="items" />
</template>

<script>
import PagesComponent from "../components/commons/PagesComponent";
import {getTopPosts} from "../utils/prismic";
export default {
	name: "top",
	components: {PagesComponent},
	async asyncData() {
		const items = await getTopPosts("document.type", "post");
		return {
			items: items.results
		};
	},
}
</script>

<style scoped>

</style>
