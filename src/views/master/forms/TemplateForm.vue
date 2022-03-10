<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="template_f">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="6">
                    <v-select @click="a_GetUser({all:true})"
                              item-value="id"
                              item-text="username"
                              :items="getUsers()" label="User" :rules="rules.user_id"
                              v-model="form.user_id"></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field label="Title" :rules="rules.title" v-model="form.title"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-textarea label="Message" :rules="rules.message" v-model="form.message"></v-textarea>
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
        name: "TemplateForm",
        mixins: [formMixin],
        computed: {
            ...mapGetters('template', ['getLoading'])
        },
        data() {
            return {
                valid: false,
                form: {
                    user_id: '',
                    title: '',
                    message: ''
                },
                rules: {
                    user: [this.required()],
                    title: [this.required()],
                    message: [this.required()]
                }
            }
        },
        props: ['button'],
        methods: {
            ...mapActions('myusers', ['a_GetUsers']),
            ...mapGetters('myusers', ['getUsers']),
            ...mapActions('template', ['a_CreateTemplate']),
            submit() {
                this.a_CreateTemplate(this.form).then(() => {
                    this.$refs.template_f.reset()
                    this.$emit('x_close')
                }).catch((error) => {
                    if (errors.data.some((x) => x.code)) {
                        this.validate(this.$refs.template_f, error.data.map(x => x.code))
                    }
                })
            }
        }
    }
</script>
