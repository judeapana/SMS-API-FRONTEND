<template>
    <div>
        <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn>
        <v-dialog v-model="dialog" max-width="690" persistent transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create Templates</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <TemplateForm button="Create"/>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
    import TemplateForm from "./forms/TemplateForm";

    export default {
        data() {
            return {
                dialog: false
            }
        },
        name: "Templates",
        components: {TemplateForm}
    }
</script>
