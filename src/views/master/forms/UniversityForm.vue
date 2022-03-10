<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="university">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="12">
                    <v-text-field counter :rules="rules.name" v-model="form.name"
                                  label="Name Of University"></v-text-field>
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
    import {mapActions, mapGetters} from "vuex";
    import {errorCode} from "../../../utils/errorcode";
    import formMixin from '../../../utils/form.mixin';

    export default {
        name: "UniversityForm",
        created() {
            if (this.button !== 'Create') {
                this.form = this.getUniversity
            }
        },
        mixins: [formMixin],
        data() {
            return {
                valid: false,
                form: {
                    name: ''
                },
                rules: {
                    name: [this.required(), this.minLength(3),
                        this.api(errorCode.university_already_exist.code, errorCode.university_already_exist.message)]
                }
            }
        },
        props: ['button'],
        computed: {
            ...mapGetters('university', ['getLoading', 'getUniversity'])
        },
        methods: {
            ...mapActions('university', ['a_UniCreate', 'a_UniGet', 'a_UniUpdate']),
            submit() {
                if (this.button === 'Create') {
                    this.a_UniCreate(this.form).then(() => {
                        this.$refs.university.reset()
                        this.a_UniGet()
                        this.$emit('x_close')
                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.university, errors.data.map(x => x.code))
                        }
                    })
                } else {
                    this.a_UniUpdate(this.form).then(() => {
                        this.a_UniGet()
                        this.$emit('x_close')
                    }).catch(() => {

                    })
                }
            }
        }
    }
</script>
