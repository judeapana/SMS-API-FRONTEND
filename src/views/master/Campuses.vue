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
                                      :items="this.getCampuses().data"
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
        <div>
            <v-dialog v-if="dialog" v-model="dialog" max-width="490" persistent transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Create Campus</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <CampusForm v-on:x_close="dialog=false" button="Create"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <div>
            <v-dialog v-if="updateDialog" v-model="updateDialog" max-width="490" persistent
                      transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="updateDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Update Campus</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <CampusForm v-on:x_close="updateDialog=false" button="Update"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>
<script>
    import CampusForm from "./forms/CampusForm";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Campuses",
        computed: {
            ...mapGetters('university', ['getLoading']),
            pagination() {
                return this.getCampuses().pagination || 0
            },
        },
        watch: {
            options: {
                handler() {
                    this.a_GetCampuses({page: this.options.page, size: this.options.itemsPerPage})
                },
                deep: true,
            },
        },

        methods: {
            _edit(val) {
                this.a_GetCampus(val).then(() => {
                    this.updateDialog = true
                }).catch(() => {

                })
            },
            _delete(val) {
            },
            ...mapActions('campus', ['a_GetCampuses', 'a_GetCampus',]),
            ...mapGetters('campus', ['getCampuses']),
        },
        components: {CampusForm},
        data() {
            return {
                search: '',
                options: {},
                updateDialog: false,
                dialog: false,
                headers: [
                    {text: 'Name', align: 'start', value: 'name'},
                    {text: 'University', value: 'university.name'},
                    {text: 'Description', value: 'description'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
            }
        },
        mounted() {
            this.$store.dispatch('main/a_change_title', 'Campuses')
        },
    }
</script>
