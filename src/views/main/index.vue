<template>
    <div>
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>
<script>
    import Navbar from "../../components/Navbar";
    import App from "../../App";

    export default {
        name: 'index',
        components: {
            Navbar, App
        }
    }
</script>
