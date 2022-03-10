<template>
    <v-app>
        <notifications position="center"/>
        <!--        <v-overlay :value="loading">-->
        <!--            <v-progress-circular indeterminate size="60"-->
        <!--            ></v-progress-circular>-->
        <!--        </v-overlay>-->
        <slot name="default"></slot>
        <router-view></router-view>
    </v-app>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'App',
        methods: {},
        computed: {
            ...mapGetters('auth', {loading: 'getLoading', errors: 'getErrors', messages: 'getMsg'}),
        },
        watch: {
            messages(value) {
                if (value) {
                    if (typeof (value.message) === "string")
                        this.$notify({
                            title: 'Success',
                            text: value.message,
                            type: 'success',
                        });
                    if (typeof (value.message) === "object") {
                        value.message.map(function (x) {
                            this.$notify({
                                title: 'Success',
                                text: x,
                                type: 'success',
                            });
                        })
                    }
                }
            },
            errors(value) {
                if (value) {
                    if (typeof (value.data.message) === "string")
                        this.$notify({
                            title: 'Authentication Error',
                            text: value.data.message,
                            type: 'error',
                        });
                    if (typeof (value.data.message) === "object") {
                        value.data.message.map(function (x) {
                            this.$notify({
                                title: 'Authentication Error',
                                text: x,
                                type: 'error',
                            });
                        })
                    }
                }
            }
        }

    };
</script>
