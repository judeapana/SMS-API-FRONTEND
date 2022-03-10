<template>
    <v-container>
        <v-row>
            <v-col md="6" class="mx-auto mt-5">
                <v-card elevation="2" :loading="false">
                    <v-card-title>Reset Password</v-card-title>
                    <v-card-subtitle>Please Enter OTP and reset your password
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-main class="px-10 pt-3 pb-4">
                        <ResetPwdForm/>
                    </v-main>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import ResetPwdForm from "../../components/forms/ResetPwdForm";

    export default {
        components: {
            ResetPwdForm
        },
        data() {
            return {}
        },
        name: "ResetPwd"
    }
</script>
