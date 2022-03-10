<template>
    <v-form v-model="valid" ref="verify" @submit.prevent="submit">
        <v-row>
            <v-col>
                <v-text-field :rules="rules.otp" v-model="form.otp" type="number" label="OTP" autofocus></v-text-field>
            </v-col>
            <v-col>
                <v-btn type="submit" :loading="loading" :disabled="!valid" fab color="green lighten-3">
                    <v-icon class="white--text">mdi-send</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
<script>
    import {mapActions, mapGetters, mapState} from "vuex";
    import {errorCode} from "../../utils/errorcode";
    import formMixin from '../../utils/form.mixin';

    export default {
        name: 'VerifyForm',
        mixins: [formMixin],
        data() {
            return {
                rules: {
                    otp: [this.required(),
                        this.maxLength(4, 'Otp length must be 4'),
                        this.api(errorCode.otp_invalid.code,
                            errorCode.otp_invalid.message)]
                },
                valid: false,
                form: {
                    otp: ''
                }
            }
        },
        computed: {
            ...mapState('auth', {
                loading: state => state.loading
            }),
            ...mapGetters('auth', {errors: 'getErrors'})
        },
        methods: {
            ...mapActions('auth', ['a_validateOTP']),
            submit() {

                this.a_validateOTP(this.form).then(() => {
                    this.$router.push({'name': "Login"})
                }).catch(() => {
                    if (this.errors.data.hasOwnProperty('code')) {
                        this.validate(this.$refs.verify,[this.errors.data.code]);
                    }
                })
            }
        }
    }
</script>
