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
                                      :items="this.getContactList().data"
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
            <v-dialog v-if="dialog" v-model="dialog" max-width="690" persistent transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Create Contact List</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <ContactListForm v-on:x_close="dialog=false" button="Create"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <div>
            <v-dialog v-if="updateDialog" v-model="updateDialog" max-width="690" persistent
                      transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="updateDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Update Contact List</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <ContactListForm v-on:x_close="updateDialog=false" button="Update"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>
<script>
    import ContactListForm from "./forms/ContactListForm";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "ContactList",
        computed: {
            ...mapGetters('contact_list', ['getLoading']),
            pagination() {
                return this.getContactList().pagination || 0
            },
        },
        watch: {
            options: {
                handler() {
                    this.a_GetContactList({page: this.options.page, size: this.options.itemsPerPage})
                },
                deep: true,
            },
        },

        methods: {
            _edit(val) {
                this.a_GetContact(val).then(() => {
                    this.updateDialog = true
                }).catch(() => {

                })
            },
            _delete(val) {
            },
            ...mapActions('contact_list', ['a_GetContactList', 'a_GetContact',]),
            ...mapGetters('contact_list', ['getContactList']),
        },
        data() {
            return {
                search: '',
                options: {},
                updateDialog: false,
                dialog: false,
                headers: [
                    {text: 'Belongs To', align: 'start', value: 'user.username'},
                    {text: 'Email Address', value: 'email_address'},
                    {text: 'Phone Number', value: 'phone_number'},
                    {text: 'Contact Name', value: 'contact_name'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
            }
        },
        components: {ContactListForm},
        mounted() {
            this.$store.dispatch('main/a_change_title', 'Contact List')
        },
    }
</script>
