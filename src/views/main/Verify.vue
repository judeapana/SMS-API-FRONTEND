<template>
    <v-container>
        <v-row>
            <v-col md="6" class="mx-auto mt-5">
                <v-card elevation="2" :loading="false">
                    <v-card-title>Verification</v-card-title>
                    <v-card-subtitle>Please Enter OTP sent to your phone number and activate your account
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-main class="px-10 pt-3 pb-4">
                        <VerifyForm/>
                    </v-main>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>


    import VerifyForm from "../../components/forms/VerifyForm";

    export default {
        components: {VerifyForm},
        data() {
            return {}
        },
        name: "Verify"
    }
</script>
