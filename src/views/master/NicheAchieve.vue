<template>
    <div>
        <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn>
        <v-dialog v-model="dialog" max-width="690" persistent transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create Niche</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <NicheForm button="create"></NicheForm>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
    import NicheForm from "./forms/NicheForm";

    export default {
        components: {NicheForm},
        data() {
            return {
                dialog: false
            }
        },
        mounted() {
            this.$store.dispatch('main/a_change_title', 'Niche Achieve')
        },
        name: "NicheAchieve"
    }
</script>
