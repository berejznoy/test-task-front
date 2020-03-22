<template>
  <v-card
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-list-item>
      <v-list-item-content class="text-md-center">
        <v-list-item-title v-if="!login" class="headline mb-1">Войти</v-list-item-title>
        <v-list-item-title v-else class="headline mb-1">Зарегистрироваться</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-form style="width: 100%">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="userName"
                append-icon="mdi-account"
                :rules="[rules.required]"
                name="input-10-1"
                label="Email или Телефон"
                hint="Поле не может быть пустым"
                counter
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Пароль"
                hint="Поле не может быть пустым"
                counter
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-if="login"
                v-model="repeatPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.repeatPassword]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Пароль еще раз"
                hint="Поле не может быть пустым"
                counter
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
              <v-col cols="12">
                <v-row justify="space-between">
                  <v-col cols="6">
                    <v-btn v-if="!login" @click="userLogin">Войти</v-btn>
                    <v-btn v-else @click="registration">Регистрация</v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-checkbox class="mt-1"  v-model="login" label="Зарегистрироваться"></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-actions>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
	name: "login.vue",
	layout: "empty",
	data: (vm) => {
	  return {
			snackbar: false,
			text: "",
			login: false,
			userName: "",
			show1: false,
			show2: true,
			show3: false,
			show4: false,
			password: "",
			repeatPassword: "",
			rules: {
				required: value => !!value || "Required.",
				repeatPassword: value => value === vm.password || "Пароли не совпадают",
			},
		}
	},
	methods: {
		async registration() {
		  try {
				const response = await this.$axios.post("/signup", {id: this.userName, password: this.password });
				await this.$auth.setUserToken(response.data.accessToken);
				localStorage.setItem("refreshToken", response.data.accessToken);
			} catch (e) {
				this.snackbar = true;
				this.text = e.message || "Server error";
				console.error(e)
			}
		},
		async userLogin() {
			try {
				const response = await this.$auth.loginWith("local", { data: {id: this.userName, password: this.password } });
				localStorage.setItem("refreshToken", response.data.accessToken);
			} catch (e) {
				this.snackbar = true;
				this.text = e.message || "Server error";
				console.error(e)
			}
		}
	},
	watch: {
		password(val) {
			if(val) this.repeatPassword = ""
		}
	}
}
</script>

<style scoped>

</style>
