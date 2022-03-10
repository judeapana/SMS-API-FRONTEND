<template>
    <v-form v-model="valid" @submit.prevent="submit" ref="niche">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="12">
                    <v-text-field :rules="rules.interest" label="Interest" v-model="form.interest"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-textarea label="Description" :rules="rules.description" v-model="form.description"></v-textarea>
                </v-col>
                <v-col cols="12" md="12">
                    <v-switch :rules="rules.active" label="Active" v-model="form.active"></v-switch>
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
        name: "NicheForm",
        computed: {
            ...mapGetters('niche_archieve', ['getLoading'])
        },
        data() {
            return {
                valid: false,
                form: {
                    interest: '',
                    description: '',
                    active: false
                },
                rules: {
                    interest: [this.required()],
                    description: [this.required()],
                    active: []
                }
            }
        },
        mixins: [formMixin],
        props: ['button'],
        methods: {
            ...mapActions('niche_archieve', ['a_CreateNiche']),
            submit() {
                this.a_CreateNiche(this.form).then(() => {
                    this.$refs.niche.reset()
                    this.$emit('x_close')
                }).catch((errors) => {
                    if (errors.data.some((x) => x.code)) {
                        this.validate(this.$refs.niche, errors.data.map(x => x.code))
                    }

                })
            }
        }
    }
</script>
