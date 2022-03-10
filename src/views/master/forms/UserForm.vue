<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="register_user">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="6" sm="12">
                    <v-text-field :rules="rules.username" v-model="form.username" label="Username"></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                    <v-text-field v-model="form.email_address" :rules="rules.email_address" type="email"
                                  label="Email Address"></v-text-field>
                </v-col>

                <v-col cols="12" md="12" sm="12">
                    <vue-tel-input-vuetify :clearable="true"
                                           :only-countries="['GH']"
                                           :rules="rules.phone_number"
                                           class="mb-3"
                                           v-model="form.phone_number"/>
                </v-col>
            </v-row>
            <v-row>

                <v-col v-if="button.toLowerCase()==='create'" cols="12" md="6" sm="12">
                    <v-text-field v-model="form.password" :rules="rules.password"
                                  label="Password"></v-text-field>
                </v-col>
                <v-col cols="12" :md="button.toLowerCase()==='create' ? 6:12">
                    <v-select :rules="rules.roles" v-model="form.role" :items="['USER', 'ADMIN', 'SUPPORT']"
                              label="Role"></v-select>
                </v-col>
                <v-col cols="12" md="12">
                    <v-select :rules="rules.account_type" v-model="form.account_type"
                              :items="['INDIVIDUAL', 'BUSINESS', 'OTHERS']"
                              label="Account Type"></v-select>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-switch label="Active" v-model="form.active"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-btn :loading="getLoading" type="submit" :disabled="!valid">{{button}}</v-btn>
                </v-col>
            </v-row>
        </v-container>

    </v-form>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {errorCode} from "../../../utils/errorcode";
    import formMixin from '../../../utils/form.mixin';


    export default {
        mixins: [formMixin],
        name: "UserForm",
        created() {
            if (this.button.toLowerCase() !== 'create') {
                this.rules.password = []
                this.form = this.getUser
            }
        },
        data() {
            return {
                snackbar: true,
                valid: false,
                form: {
                    username: '',
                    email_address: '',
                    phone_number: '',
                    password: '',
                    role: '',
                    account_type: '',
                    active: true,

                },
                rules: {
                    username: [this.username(),
                        this.api(errorCode.user_already_exist.code, errorCode.user_already_exist.message)],
                    email_address: [this.required(), this.email(),
                        this.api(errorCode.email_taken.code, errorCode.email_taken.message)],
                    phone_number: [this.phone(), this.required(),
                        this.api(errorCode.phone_number_taken.code, errorCode.phone_number_taken.message)],
                    password: [this.required()],
                    roles: [this.required()],
                    account_type: [this.required()],
                }
            }
        },
        props: ['button', 'option'],
        computed: {
            ...mapGetters('myusers', ['getMessage', 'getLoading', 'getUser'])
        },
        methods: {
            ...mapActions('myusers', ['a_CreateUser', 'a_UpdateUser', 'a_GetUsers']),
            submit() {
                if (this.button.toLowerCase() === 'create') {
                    this.a_CreateUser(this.form).then(() => {
                        this.$notify({
                            title: 'Message',
                            text: this.getMessage
                        })
                        this.$refs.template_f.reset()
                        this.$emit('x_close')
                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.register_user, errors.data.map(x => x.code))
                        }
                    })
                } else {
                    this.a_UpdateUser(this.form).then(() => {
                        this.a_GetUsers()
                        this.$emit('x_close')

                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.register_user, errors.data.map(x => x.code))
                        }
                    })
                }

            }
        }
    }
</script>
