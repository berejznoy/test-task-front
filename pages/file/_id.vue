<template>
  <v-card
    class="mx-auto"
    max-width="400"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Файл</div>
        <v-list-item-title class="headline mb-1">{{item.originalname}}</v-list-item-title>
        <v-list-item-subtitle>Размер: {{item.size | $toMegaBite}} кб </v-list-item-subtitle>
        <v-list-item-subtitle> Обновлен: {{new Date(item.updatedAt).toLocaleDateString()}} </v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar
        class="ma-3"
        size="125"
        tile
      >
        <v-img :src="item.extension | $getImage"></v-img>
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn @click.prevent="download" download text>Скачать</v-btn>
      <v-btn @click.prevent="deleteDocument" text>Удалить</v-btn>
    </v-card-actions>
    <v-divider />
    <div class="overline ma-4 ">Обновление</div>
    <div class="ma-5">
      <file-picker :multiple="false" :fileId="$route.params.id" @update="updateCard"/>
    </div>

  </v-card>
</template>

<script>
import FilePicker from "~/components/FilePicker";
export default {
	components: {FilePicker},
	async asyncData({params, $axios, error}) {
	  try {
			const item = await $axios.$get(`/file/${params.id}`);
			return {
				item: item
			};
		} catch (e) {
			error({ statusCode: 404, message: "Файл не существует или был удален" })
		}
	},
	methods: {
	  async deleteDocument() {
	    try {
				await this.$axios.$delete(`/file/delete/${this.$route.params.id}`);
				await this.$router.replace("/")
			} catch(e) {
	      console.error(e)
			}
		},
		async download() {
			const response = await this.$axios.$get(`/file/download/${this.$route.params.id}` ,{responseType: "blob"});
			const downloadUrl = window.URL.createObjectURL(new Blob([response]));
			const link = document.createElement("a");
			link.href = downloadUrl;
			link.setAttribute("download", this.item.originalname);
			document.body.appendChild(link);
			link.click();
			link.remove();
		},
		updateCard(val) {
	    this.item = val
		}
	}
}
</script>

<style scoped>

</style>
