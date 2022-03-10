<template>
    <div class="pt-5">
        <v-container>
            <v-row>
                <v-col md="6" class="mx-auto">
                    <v-card elevation="2" :loading="false">
                        <v-card-title>Forgot Password</v-card-title>
                        <v-card-subtitle>lets help you retrieve it an, <b>OTP</b> will be sent to your phone number.
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-main class="px-10 pt-3 pb-4">
                            <v-form v-model="valid" ref="forgot_pwd" @submit.prevent="submit">
                                <v-text-field v-model="form.phone_number" :rules="rules.phone_number"
                                              label="Phone Number"></v-text-field>
                                <v-btn type="submit" :disabled="!valid" :loading="loading"
                                       class=" mt-4 green lighten-2 white--text">
                                    Send
                                </v-btn>
                            </v-form>
                        </v-main>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>
<script>
    import VuetifyJetValidator from "vuetify-jet-validator";
    import {mapActions, mapGetters, mapState} from "vuex";
    import {errorCode} from "../../utils/errorcode";

    const validator = new VuetifyJetValidator();
    export default {
        name: "ForgotPwd",
        data() {
            return {
                valid: false,
                form: {
                    phone_number: null
                },
                rules: {
                    phone_number: [validator.rules.required(), validator.rules.api(errorCode.invalid_phone_number.code,
                        errorCode.invalid_phone_number.message)]
                }
            }
        }, computed: {
            ...mapState('auth', {
                loading: state => state.loading,
            }),
            ...mapGetters('auth', {errors: 'getErrors'})

        }, methods: {
            ...mapActions('auth', ['a_forgotPassword']),
            submit() {
                if (!validator.formIsValid(this.$refs.forgot_pwd)) {
                    return false
                }
                this.a_forgotPassword(this.form).then(() => {
                    this.$router.push({'name': "ResetPwd"})
                }).catch(() => {
                    if (this.errors.data.hasOwnProperty('code')) {
                        validator.setRequestApiError(this.errors.data.code);
                    }
                })
            }
        }
    }
</script>
