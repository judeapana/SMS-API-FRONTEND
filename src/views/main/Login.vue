<template>
    <div class="pt-5">
        <v-container>
            <v-row>
                <v-col md="6" class="mx-auto">
                    <v-card elevation="2" :loading="getLoading">
                        <v-card-title>Login</v-card-title>
                        <v-card-subtitle>Please provide your username and password</v-card-subtitle>
                        <v-divider></v-divider>
                        <v-main class="px-10 pt-3 pb-4">
                            <LoginForm/>
                        </v-main>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>
<script>
    import LoginForm from '../../components/forms/LoginForm'
    import {mapGetters} from "vuex";

    export default {
        name: "Login",
        components: {
            LoginForm
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters('auth', ['getLoading'])
        },
        methods: {}
    }
</script>
