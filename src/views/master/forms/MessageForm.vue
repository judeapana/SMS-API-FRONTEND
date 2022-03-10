<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="message">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="12">
                    <v-select @click="a_GetUser({all:true})"
                              item-value="id" clearable
                              item-text="username"
                              :items="getUsers()" label="User(s)" multiple :rules="rules.user"
                              v-model="form.users"></v-select>
                </v-col>
                <v-col class="pt-0" cols="12" md="12">
                    <v-textarea clearable label="Message/Text" :rules="rules.message" counter
                                v-model="form.message"></v-textarea>
                </v-col>
                <v-col cols="12" md="12">
                    <v-select label="Option" :items="['Flash Text','Text']" :rules="rules.option"
                              v-model="form.option"></v-select>
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
    import formMixin from '../../../utils/form.mixin';
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "MessageForm",
        mixins: [formMixin],
        computed: {
            ...mapGetters('message', ['getLoading'])
        },
        data() {
            return {
                with_contact: false,
                valid: false,
                form: {
                    users: [],
                    message: '',
                    option: ''
                },
                rules: {
                    option: [this.required()],
                    user: [this.required()],
                    message: [this.required(), this.maxLength(160)]
                }
            }
        },
        props: ['button'],
        methods: {
            ...mapActions('myusers', ['a_GetUsers']),
            ...mapGetters('myusers', ['getUsers']),
            ...mapActions('message', ['a_CreateMessage']),
            submit() {
                this.a_CreateMessage(this.form).then(() => {
                    this.$refs.message.reset()
                    this.$emit('x_close')
                }).catch((errors) => {
                    if (errors.data.some((x) => x.code)) {
                        this.validate(this.$refs.message, errors.data.map(x => x.code))
                    }
                })
            }
        }
    }
</script>
