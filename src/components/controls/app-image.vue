<template>    
    <div class="app-image">
        <img src="assets/img/app/app-img.svg" alt="Большой экран">
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.app-image {
    margin-right: 30px;
    max-width: 550px;
    position: relative;
    z-index: 1;
}

.app-image img {
    max-width: 100%;
    height: auto;
}

@media all and (max-width: 950px) {
    .app-image {
        margin-top: 60px;
        margin-bottom: 71px;
    }
}

@media all and (max-width: 400px) {
    .app-image {
        margin-top: 20px;
    }
}

</style>