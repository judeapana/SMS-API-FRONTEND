<template>
    <nav>
        <v-app-bar dense color="white">
            <v-img :src="logo" contain max-height="40" max-width="40" class="mx-2"></v-img>
            <v-toolbar-title>
                <span class="font-weight-bold">CampNotify</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu>
                <template v-slot:activator="{attr,on}">
                    <v-app-bar-nav-icon class="hidden-md-and-up" v-bind="attr" v-on="on"></v-app-bar-nav-icon>
                </template>
                <v-list>
                    <template v-for="link in links">
                        <v-list-item :to="link.to">
                            <v-icon class="px-1">{{link.icon}}</v-icon>
                            <v-list-item-title> {{link.name}}</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-menu>

            <v-toolbar-items class="hidden-sm-and-down">
                <template v-for="link in links ">
                    <v-btn text :to="link.to">
                        <v-icon class="px-1">{{link.icon}}</v-icon>
                        {{link.name}}
                    </v-btn>
                </template>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
            <v-btn to="Login" small fab color="deep-orange accent-3 hidden-md-and-up" class="mx-4 white--text">
                <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn to="login" color="deep-orange accent-3 hidden-sm-and-down" class="mx-4 white--text">
                <v-icon>mdi-account</v-icon>
                <span> LOG IN</span>
            </v-btn>

            <v-btn to="Register" fab small class="white--text" color="lime darken-2 hidden-md-and-up">
                <v-icon>mdi-lock</v-icon>
            </v-btn>
            <v-btn to="register" class="white--text" color="lime darken-2 hidden-sm-and-down">
                <v-icon>mdi-lock</v-icon>
                <span>SIGN IN</span>
            </v-btn>
        </v-app-bar>
    </nav>
</template>
<script>
    import applogo from '../assets/logo-5203035_960_720.webp';


    export default {
        data() {
            return {
                logo: applogo,
                links: [
                    {name: 'About Us', to: '/about-us', icon: 'mdi-information-outline'},
                    {name: 'Contact Us', to: '/contact-us', icon: 'mdi-card-account-phone'}
                ]
            }
        }
    }
</script>
