<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="contact_list">
        <v-container fluid>
            <v-row>
                <v-col md="6" cols="12">
                    <v-select :loading="getLoading"
                              item-value="id"
                              item-text="username"
                              :items="getUsers()"
                              @click="a_GetUsers({all: true})"
                              label="User"
                              :rules="rules.user"
                              v-model="form.user_id">
                    </v-select>
                </v-col>
                <v-col md="6" cols="12">
                    <v-text-field label="Name Of Contact" :rules="rules.contact_name"
                                  v-model="form.contact_name"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" cols="12">

                    <vue-tel-input-vuetify :clearable="true"
                                           :only-countries="['GH']"
                                           :rules="rules.phone_number"
                                           class="mb-3"
                                           v-model="form.phone_number"/>
                </v-col>
                <v-col md="6" cols="12">
                    <v-text-field type="email" label="Email Address" :rules="rules.email_address"
                                  v-model="form.email_address"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="12" cols="12">

                    <v-switch :rule="rules.active" v-model="form.active" inset label="Active"></v-switch>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-btn :loading="getLoading" type="submit" :disabled="!valid">{{button}}</v-btn>
                </v-col>
            </v-row>

        </v-container>


    </v-form>
</template>

<script>

    import formMixin from '../../../utils/form.mixin'
    import {mapActions, mapGetters} from "vuex";
    import {errorCode} from "../../../utils/errorcode";

    export default {
        name: "ContactListForm",
        created() {
            if (this.button !== 'Create') {
                this.form = this.getContact
            }
        },
        computed: {
            ...mapGetters('myusers', ['getLoading']),
            ...mapGetters('contact_list', ['getLoading', 'getContact']),
        },
        mixins: [formMixin],
        data() {
            return {
                valid: false,
                form: {
                    user_id: '',
                    contact_name: '',
                    phone_number: '',
                    email_address: '',
                    active: ''
                },
                rules: {
                    user: [this.required()],
                    contact_name: [this.required(), this.api(errorCode.contact_already_exist.code, errorCode.contact_already_exist.message)],
                    phone_number: [this.required(), this.phone()],
                    email_address: []
                }
            }
        },
        props: ['button'],
        methods: {
            ...mapActions('contact_list', ['a_CreateContactList', 'a_UpdateContact']),
            ...mapActions('myusers', ['a_GetUsers']),
            ...mapGetters('myusers', ['getUsers']),
            submit() {
                if (this.button === 'Create') {
                    this.a_CreateContactList(this.form).then(() => {
                        this.$refs.contact_list.reset()
                        this.$emit('x_close')
                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.contact_list, errors.data.map(x => x.code));
                        }
                    })
                } else {
                    this.a_UpdateContact(this.form).then(() => {
                        this.$emit('x_close')
                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.contact_list, errors.data.map(x => x.code));
                        }
                    })
                }
            }
        }
    }
</script>
