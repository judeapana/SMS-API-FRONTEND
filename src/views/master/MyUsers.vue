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
                                      :items="this.getUsers().data"
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


        <v-dialog v-model="dialog" max-width="690" persistent transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create New User</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <UserForm v-on:x_close="dialog=false" button="Create"></UserForm>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-if="updateDialog" v-model="updateDialog" max-width="690" persistent
                  transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="secondary">
                    <v-btn icon dark @click="updateDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Update User</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <UserForm v-on:x_close="updateDialog=false" button="Update"></UserForm>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>

</template>
<script>
    import UserForm from "./forms/UserForm";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "MyUsers",
        watch: {
            options: {
                handler() {
                    this.a_GetUsers({page: this.options.page, size: this.options.itemsPerPage})
                },
                deep: true,
            },
        },
        computed: {
            pagination() {
                return this.getUsers().pagination || 0
            },
            ...mapGetters('myusers', ['getLoading'])
        },
        data: () => ({
            search: '',
            updateDialog: false,
            options: {},
            dialog: false,
            headers: [
                {
                    text: 'Username',
                    align: 'start',
                    value: 'username',
                },
                {text: 'Email Address', value: 'email_address'},
                {text: 'Phone Number', value: 'parse_phone_number'},
                {text: 'Role', value: 'role'},
                {text: 'Account Type', value: 'account_type'},
                {text: 'Last Logged In', value: 'last_logged_in'},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
        }),
        created() {
            this.a_GetUsers()
        },

        methods: {
            _edit(val) {
                this.a_GetUser(val).then(() => {
                    this.updateDialog = true
                }).catch(() => {

                })
            },
            _delete(val) {

            },
            ...mapGetters('myusers', ['getUsers']),
            ...mapActions('myusers', ['a_GetUsers', 'a_GetUser', 'a_SearchUsers']),

        },
        components: {UserForm},
        mounted() {
            this.$store.dispatch('main/a_change_title', 'My Users')
        },
    }
</script>
