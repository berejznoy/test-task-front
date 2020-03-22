<template>
  <v-card
    max-width="800"
    class="mx-auto"
  >
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Мои файлы</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
<div class="ma-4">
    <file-picker multiple @update="updateData"/>
</div>
    <v-container class="mt-0 pt-0">
      <v-row>
        <v-col
          v-for="(item, i) in items.rows"
          :key="i"
          cols="6"
        >
          <v-card
            class="card-light"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                >
                  <p class="title">{{item.originalname}}</p>
                </v-card-title>

                <v-card-subtitle class="py-0" style="color: #000"><p class="caption my-0"> Обновлен: {{new Date(item.updatedAt).toLocaleDateString()}} </p></v-card-subtitle>
                <v-card-subtitle class="py-0" style="color: #000"><p class="caption my-0"> Размер: {{item.size | $toMegaBite}} кб </p></v-card-subtitle>
                <v-card-actions>
                  <v-btn text light nuxt :to="`/file/${item.id}`">Подробнее</v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.extension | $getImage"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import FilePicker from "~/components/FilePicker";
export default {
	components: {FilePicker},
	async asyncData({$axios}) {
		const items = await $axios.$get("/file/list");
		return {
			items: items
		};
	},
	methods: {
	  updateData(val) {
	    this.items = val
		}
	}
}
</script>
<style>
  .card-light {
    background-color: #fafafa !important;
    color: #000 !important;
  }
</style>
