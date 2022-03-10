<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="12" class="mx-auto mt-10 text-center">
                    <v-btn :to="{name:query.name}" color="red" class="white--text">Go back to your dashboard</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    export default {
        name: "Unauthorized",
        data() {
            return {
                query: this.$route.query
            }
        }
    }
</script>
