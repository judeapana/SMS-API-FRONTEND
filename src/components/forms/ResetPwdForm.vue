<template>
    <v-form v-model="valid" ref="reset_pwd" @submit.prevent="submit">
        <v-row>
            <v-col md="10">

                <v-text-field :rules="rules.otp" v-model="form.otp" label="OTP" :autofocus="true"></v-text-field>
                <v-text-field @focus="clear_pwd" :rules="rules.password" v-model="form.password" label="New Password"
                              type="password"></v-text-field>
                <v-text-field class="mb-5" :rules="rules.c_password" v-model="form.c_password"
                              label="Confirm Password"
                              type="password"></v-text-field>
                <v-btn type="submit" :loading="loading" color="orange lighten-2 " :disabled="!valid"
                       class="white--text">Reset
                    Password
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
<script>
    import formMixin from '../../utils/form.mixin';
    import {mapActions, mapGetters, mapState} from "vuex";
    import {errorCode} from "../../utils/errorcode";

    export default {
        mixins: [formMixin],
        name: 'ResetPwdForm',
        data() {
            const that = this;
            return {
                rules: {
                    otp: [this.required(),
                        this.minLength(4, 'Otp must not be less than 4 digits'),
                        this.maxLength(4, 'Otp must not be greater than 4 digits'),
                        this.api(errorCode.otp_invalid.code, errorCode.otp_invalid.message)
                    ],
                    password: [this.required(), this.minLength(5)],
                    c_password: [
                        this.required(),
                        this.matches(that, "form.password", 'please password doesnt match confirm password')
                    ]
                },
                valid: false,
                showForm: true,
                form: {
                    otp: '',
                    password: '',
                    c_password: ''
                }
            }
        }, computed: {
            ...mapGetters('auth', {errors: 'getErrors'}),
            ...mapState('auth', {
                loading: state => state.loading
            })
        },
        methods: {
            ...mapActions('auth', ['a_resetPassword']),
            submit() {
                this.a_resetPassword({'otp': this.form.otp, 'password': this.form.password}).then(() => {
                    this.$router.push({'name': "Login"})
                }).catch(() => {
                    if (this.errors.data.hasOwnProperty('code')) {
                        this.validate(this.$refs.reset_pwd, [this.errors.data.code]);
                    }
                })
            },
            clear_pwd() {
                this.form.c_password = "";
            }
        }


    }
</script>
