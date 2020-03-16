<template>
  <pages-component :items="items"/>
</template>

<script>
import {getPostsByTag} from '../../utils/prismic'
import PagesComponent from "../../components/commons/PagesComponent";
import {dictionary} from "../../config/dictionary";

export default {
	components: {PagesComponent},
	async asyncData({params, payload}) {
		let response = {};
		if (payload) response = payload;
		else {
			response.uid = params.name;
			response.name = dictionary[params.name];
			console.log(response.uid)
		}
		const items = await getPostsByTag("document.tags", response.name);
		return {
			items: items.results
		};
	},
}
</script>

<style scoped>
</style>

