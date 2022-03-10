<template>
    <div class="pt-5">
        <v-container>
            <v-row>
                <v-col md="6" class="mx-auto">
                    <v-card elevation="2">
                        <v-card-title>Register</v-card-title>
                        <v-card-subtitle>Please provide the requested information.</v-card-subtitle>
                        <v-divider></v-divider>
                        <v-main class="px-10 pt-3 pb-4">
                            <RegisterForm/>
                        </v-main>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>
<script>

    import RegisterForm from "../../components/forms/RegisterForm";

    export default {
        name: "Register",
        components: {RegisterForm},
        data() {
            return {}
        },
    }
</script>
