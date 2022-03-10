<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="credit">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="12">
                    <v-select @click="a_GetUser({all:true})"
                              item-value="id"
                              item-text="username"
                              :items="getUsers()" label="User" :rules="rules.user_id"
                              v-model="form.user_id"></v-select>
                </v-col>

                <v-col cols="12" md="12">
                    <v-select :rules="rules.form" label="Form" :items="['MAIN','BONUS']" v-model="form.form"></v-select>
                </v-col>
                <v-col cols="12" md="12">
                    <v-slider :rules="rules.unit" step="1" label="Unit(s)" v-model="form.unit"
                              thumb-label="always"></v-slider>
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
        name: "CreditForm",
        mixins: [formMixin],
        computed: {
            ...mapGetters('credit', ['getLoading'])
        },
        data() {
            return {
                valid: false,
                form: {
                    user_id: '',
                    unit: 0,
                    form: ''
                },
                rules: {
                    user: [this.required()],
                    unit: [this.required()],
                    form: [this.required()]
                }
            }
        },
        props: ['button'],
        methods: {
            ...mapActions('myusers', ['a_GetUsers']),
            ...mapGetters('myusers', ['getUsers']),
            ...mapActions('credit', ['a_UpdateCredit']),
            submit() {
                this.a_UpdateCredit(this.form).then(() => {
                    this.$refs.credit.reset()
                    this.$emit('x_close')
                }).catch((errors) => {
                    if (errors.data.some((x) => x.code)) {
                        this.validate(this.$refs.credit, errors.data.map(x => x.code))
                    }
                })
            }
        }
    }
</script>
