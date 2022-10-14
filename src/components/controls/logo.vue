<template>    
    <r-link route="main" class="logo">
        <img src="/assets/img/logo/logo.svg" alt="Logo">
        <img src="/assets/img/logo/artifactum.svg" alt="Logo">
    </r-link>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo img:first-child {
    margin-right: 10px;
}

.footer-logo img:first-child {
    max-width: 30px;
}

.footer-logo img:last-child {
    max-width: 119px;
}

@media all and (max-width: 400px) {
    .logo img {
        max-width: 100px;
    }

    .logo img:first-child {
        max-width: 25px;
    }
}

</style>