<template>
    <v-form @submit.prevent="submit" v-model="valid" ref="register">
        <v-text-field :rules="rules.email_address"
                      label="Email Address"
                      v-model="form.email_address"
        ></v-text-field>

        <vue-tel-input-vuetify :clearable="true"
                               :only-countries="['GH']"
                               :rules="rules.phone_number"
                               class="mb-3"
                               v-model="form.phone_number"/>

        <v-text-field :rules="rules.password"
                      v-model="form.password"
                      label="Password"
                      type="password"
        ></v-text-field>
        <v-btn :disabled="!valid" class="mt-4 pink lighten-2 white--text" type="submit" :loading="loading">Register
        </v-btn>
    </v-form>
</template>

<script>
    import {mapActions, mapGetters, mapState} from "vuex";
    import {errorCode} from "../../utils/errorcode";
    import formMixin from '../../utils/form.mixin';

    export default {
        name: 'RegisterForm',
        mixins: [formMixin],
        data() {
            return {
                valid: false,
                rules: {
                    email_address: [this.required('Your email address is required'),
                        this.email(), this.api(errorCode.email_taken.code,
                            errorCode.email_taken.message)],
                    phone_number: [this.required('Your phone number is required'),
                        this.api(errorCode.phone_number_taken.code,
                            errorCode.phone_number_taken.message)],
                    password: [this.required('Your password is required'),
                        this.minLength(5),
                        this.maxLength(20)]
                },
                form: {
                    phone_number: '',
                    email_address: '',
                    password: ''
                }
            }
        },

        computed: {
            ...mapState('auth', {
                loading: state => state.loading,
            }),
            ...mapGetters('auth', {errors: 'getErrors'})
        },
        methods: {
            ...mapActions('auth', ["a_registerUser"]),
            submit() {
                this.a_registerUser(this.form).then(() => {
                    this.$router.push({name: 'Verify'})
                }).catch(() => {
                    if (this.errors.data.hasOwnProperty('code')) {
                        this.validate(this.$refs.register, [this.errors.data.code]);
                    }
                })

            },
        },

    }
</script>
