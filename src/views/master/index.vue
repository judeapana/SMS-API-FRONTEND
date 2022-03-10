<template>
    <v-main>
        <nav>
            <div>
                <v-toolbar dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
                    <v-app-bar-nav-icon @click="toggleDrawer=!toggleDrawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>{{getTitle}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-export</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-bottom-navigation  :value="1" color="primary" horizontal>
                    <v-btn>
                        <span>Credits</span>

                        <v-icon>mdi-history</v-icon>
                    </v-btn>

                    <v-btn>
                        <span>Customers</span>

                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn>
                        <span>Settings</span>

                        <v-icon>mdi-cogs</v-icon>
                    </v-btn>
                </v-bottom-navigation>

            </div>
        </nav>

        <v-navigation-drawer v-model="toggleDrawer" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        CMP Notify
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Notifying campuses
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <template v-for="item in items">
                    <template v-if="item.hasOwnProperty('children')">
                        <v-list-item-subtitle class="grey--text darken-4 pt-2 pb-2 text-capitalize"
                                              v-if="item.subtitle">
                            <v-icon>mdi-account-circle</v-icon>
                            {{item.subtitle}}
                        </v-list-item-subtitle>
                        <v-list-item :to="child.to" v-for="child in item.children" :key="item.title" link>
                            <v-list-item-icon>
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ child.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                    <template v-else>
                        <v-list-item link :to="item.to">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </template>
            </v-list>
        </v-navigation-drawer>

        <div v-show="false">
            <v-banner color="warning" class="white--text"
                      v-model="v0"
                      sticky
                      transition="slide-y-transition">
                <v-icon x-large color="white">mdi-alert</v-icon>
                Your Account is not fully configured
                <template v-slot:actions="{ dismiss }">
                    <v-btn text color="danger" @click="dismiss">Dismiss</v-btn>
                    <v-btn text color="success">Retry</v-btn>
                </template>
            </v-banner>
        </div>

        <router-view></router-view>

    </v-main>

</template>
<script>

    import {mapActions, mapGetters, mapState} from "vuex";

    export default {
        name: 'index',
        data() {
            return {
                v0: true,
                ...mapState('main', {
                    drawer: state => state.drawer
                }),
                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard', to: {name: 'Master'}},
                    {title: 'My Users', icon: 'mdi-view-dashboard', to: {name: "MyUsers"}},

                    {
                        children: [
                            {title: 'Invoices', icon: 'mdi-help-box', to: {name: "Invoices"}},
                            {title: 'Transactions', icon: 'mdi-help-box', to: {name: "Transactions"}},
                        ], subtitle: 'Collect Payments'
                    },
                    {
                        children: [
                            {title: 'My Customers', icon: 'mdi-image', to: {name: "MyCustomers"}},
                            {title: 'Credits', icon: 'mdi-help-box', to: {name: "Credits"}},

                        ], subtitle: 'Your Business'
                    },
                    {
                        children: [
                            {title: 'Universities', icon: 'mdi-help-box', to: {name: "University"}},
                            {title: 'Contact List', icon: 'mdi-help-box', to: {name: "ContactList"}},
                            {title: 'Campuses', icon: 'mdi-help-box', to: {name: "Campuses"}},
                            {title: 'Messages', icon: 'mdi-help-box', to: {name: "Messages"}},
                            {title: 'Niche Achieve', icon: 'mdi-help-box', to: {name: "NicheAchieve"}},
                            {title: 'Templates', icon: 'mdi-help-box', to: {name: "Templates"}},
                        ], subtitle: 'Application'
                    },
                ],
                right: null,
            }
        },
        methods: {
            ...mapActions('main', ['a_drawer'])
        },
        computed: {
            ...mapGetters('main', ['getTitle']),
            toggleDrawer: {
                get() {
                    return this.getDrawer
                },
                set(value) {
                    this.a_drawer(value);
                }
            },
            ...mapGetters('main', ['getDrawer'])
        }
    }
</script>











