<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="campus">
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-text-field :rules="rules.name" v-model="form.name" label="Name Of Campus"></v-text-field>
                    <v-select :items="getUniversities" item-text="name"
                              item-value="id"
                              @click="loadUniversities"
                              :loading="uniLoading" :rules="rules.university"
                              v-model="form.university_id"
                              label="University">
                    </v-select>
                    <v-textarea :rules="rules.description" v-model="form.description" label="Description"></v-textarea>
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
        created() {
            if (this.button !== 'Create') {
                this.form = this.getCampus
            }
        },
        mixins: [formMixin],
        name: "CampusForm",
        computed: {
            ...mapGetters('university', {
                uniLoading: 'getLoading',
                getUniversities: 'getUniversities'
            }),
            ...mapGetters('campus', ['getLoading', 'getCampus']),

        },
        data() {
            return {
                valid: false,
                search: null,
                form: {
                    name: '',
                    university_id: '',
                    description: ''
                },
                rules: {
                    name: [this.required(), this.minLength(3),
                        this.api(errorCode.campus_already_exist.code, errorCode.campus_already_exist.message)],
                    university: [this.required()],
                    description: []
                }
            }
        },

        props: ['button'],
        methods: {
            loadUniversities() {
                this.a_UniGet({all: true})
            },
            ...mapActions('university', ['a_UniGet', 'a_UniCreate']),
            ...mapActions('campus', ['a_CampusCreate', 'a_CampusUpdate', 'a_GetCampuses']),
            submit() {
                if (this.button === 'Create') {
                    this.a_CampusCreate(this.form).then(() => {
                        this.$refs.campus.reset()
                        this.a_GetCampuses()
                        this.$emit('x_close')

                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.campus, errors.data.map(x => x.code))
                        }
                    })
                } else {
                    this.a_CampusUpdate(this.form).then(() => {
                        this.a_GetCampuses()
                        this.$emit('x_close')
                    }).catch((errors) => {
                        if (errors.data.some((x) => x.code)) {
                            this.validate(this.$refs.campus, errors.data.map(x => x.code))
                        }
                    })
                }
            }
        }
    }
</script>
