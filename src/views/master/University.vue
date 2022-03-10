<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn>
                <div class="mt-2">
                    <v-card raised>
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table :items-per-page="pagination.per_page" :options.sync="options"
                                      :loading="getLoading"
                                      :server-items-length="pagination.total"
                                      :headers="headers"
                                      :items="this.getUniversities().data"
                                      sort-by="calories" class="elevation-1">

                            <template v-slot:item.actions="{ item }">
                                <v-btn @click="_edit(item.id)" outlined color="indigo" depressed
                                       x-small fab
                                       class="mr-2">
                                    <v-icon small class="">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn x-small depressed color="red" outlined fab>
                                    <v-icon @click="_delete(item.id)" small>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </div>
            </v-col>
        </v-row>


        <v-dialog v-model="dialog" max-width="690" persistent
                  transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create University</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <UniversityForm v-if="dialog" v-on:x_close="dialog=false" button="Create"/>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="updateDialog" max-width="690" persistent
                  transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="secondary">
                    <v-btn icon dark @click="updateDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Update University</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <UniversityForm v-if="updateDialog" v-on:x_close="updateDialog=false" button="Update"/>
                </v-card-text>
            </v-card>
        </v-dialog>

    </v-container>
</template>
<script>
    import UniversityForm from "./forms/UniversityForm";
    import CampusForm from "./forms/CampusForm";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "University",
        methods: {
            _edit(val) {
                this.a_University(val).then(() => {
                    this.updateDialog = true
                }).catch(() => {

                })
            },
            _delete(val) {
                console.log(val)
            },
            ...mapGetters('university', ['getUniversities']),
            ...mapActions('university', ['a_UniGet', 'a_University']),
        },
        computed: {
            ...mapGetters('university', ['getLoading']),
            pagination() {
                return this.getUniversities().pagination || 0
            },
        },
        watch: {
            options: {
                handler() {
                    this.a_UniGet({page: this.options.page, size: this.options.itemsPerPage})
                },
                deep: true,
            },
        },
        data() {
            return {
                search: '',
                options: {},
                updateDialog: false,
                dialog: false,
                campus_d: false,
                headers: [
                    {text: 'Name', align: 'start', value: 'name'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
            }
        },
        components: {CampusForm, UniversityForm}
    }
</script>
