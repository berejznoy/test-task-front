<template>
  <pages-component :items="items"/>
</template>

<script>
import {getPostsByTag} from '../../utils/prismic'
import PagesComponent from "../../components/commons/PagesComponent";

export default {
  components: {PagesComponent},
  async asyncData(vm) {
    const tag = vm.route.params.name[0].toUpperCase() + vm.route.params.name.slice(1);
    const items = await getPostsByTag("document.tags", tag);
    return {
      items: items.results
    };
  },
}
</script>

<style scoped>
</style>

