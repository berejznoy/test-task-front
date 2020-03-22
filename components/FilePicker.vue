<template>
  <v-form>
  <v-file-input
    class="mt-5 pt-5"
    v-model="files"
    counter
    label="Загрука файлов"
    :multiple="multiple"
    placeholder="Выберите файлы"
    prepend-icon="mdi-paperclip"
    outlined
    success-messages="Файлы успешно загружены"
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline mx-2"
      >
        +{{ files.length - 2 }} Файл(ов)
      </span>
    </template>
  </v-file-input>
    <div class="text-md-right">
    <v-btn @click="upload" :loading="loading" :disabled="!files.length"> Загрузить </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
	name: "FilePicker",
	props: {
		multiple: Boolean,
		fileId: {
		  type: String
		}
	},
	data: () => ({
		files: [],
		loading: false
	}),
	methods: {
	  async upload() {
	    try {
	      this.loading = true;
				const data = new FormData();
				let newData = [];
				if(this.multiple) {
					this.files.map(file => data.append("documents", file));
					await this.$axios.$post("/file/upload",  data);
					newData = await this.$axios.$get("/file/list")
				} else {
					data.append("documents", this.files[0]);
					newData = await this.$axios.$put(`/file/update/${this.fileId}`,  data);
				}
				this.$emit("update", newData);
				this.files = []
			} catch (e) {
				console.error(e)
			} finally {
				this.loading = false;
			}
		}
	}
}
</script>
