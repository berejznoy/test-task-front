<template>
  <div>
      <transition name="fade">
        <v-btn v-if="sharedShow" icon small @click="copyLink"><v-icon small>mdi-link</v-icon> </v-btn>
      </transition>
      <v-btn icon @click="sharedShow = !sharedShow">
        <v-icon>mdi mdi-dots-horizontal</v-icon>
      </v-btn>
      <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      vertical
      >
        <p class="text-center pa-0 ma-0"> Ссылка скопирована </p>
      </v-snackbar>
  </div>
</template>

<script>
    export default {
        name: "SharedComponents.vue",
      props: {
          uid: {
            type: String
          }
      },
      data() {
        return {
          sharedShow: false,
          snackbar: false
        }
      },
      methods: {
          copyLink() {
            if (this.uid) this.$copyText(`${window.location.hostname}/story/${this.uid}`);
            else console.log(this.$route);
          this.snackbar = !this.snackbar
        }
      }
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
