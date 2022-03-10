<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="login">
        <v-text-field
                class="pb-2"
                label="Username"
                v-model="form.username"
                :rules="rules.username"
        ></v-text-field>
        <v-text-field class="pb-4"
                      v-model="form.password"
                      label="Password"
                      type="password"
                      :rules="rules.password"
        ></v-text-field>
        <v-btn :loading="loading" class="pink lighten-2 white--text" :disabled="!valid" type="submit">Login</v-btn>
    </v-form>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import {getCurrentUser} from "../../utils";
    import {Roles} from "../../utils/role";
    import formMixin from '../../utils/form.mixin';

    export default {
        name: 'LoginForm',
        mixins: [formMixin],
        data() {
            return {
                valid: false,
                form: {
                    username: '',
                    password: '',
                },

                rules: {
                    username: [this.required('your username is required')],
                    password: [this.required('your password is required')]
                }
            }
        },
        methods: {
            ...mapActions('auth', ['a_loginUser']),
            submit() {
                this.a_loginUser(this.form).then(() => {
                    const user = getCurrentUser();
                    let query = this.$route.query.name
                    switch (user.role) {
                        case Roles.Admin.name:
                            this.$router.push({name: Roles.Admin.urlName})
                            break;
                        case Roles.Support.name:
                            this.$router.push({name: Roles.Support.urlName})
                            break;
                        case Roles.User.name:
                            this.$router.push({name: Roles.User.urlName})
                            break;
                        default:
                            return
                    }
                })
            }
        }, computed: {
            ...mapState({
                loading: state => state.auth.loading
            })
        }, mounted() {
            const user = getCurrentUser();
            if (user) {
                switch (user.role) {
                    case Roles.Admin.name:
                        this.$router.push({name: Roles.Admin.urlName})
                        break;
                    case Roles.Support.name:
                        this.$router.push({name: Roles.Support.urlName})
                        break;
                    case Roles.User.name:
                        this.$router.push({name: Roles.User.urlName})
                        break;
                    default:
                        return
                }
            }
        }
    }
</script>
