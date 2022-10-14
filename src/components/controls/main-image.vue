<template>    
    <div class="main-image">
        <phone-group />

        <!-- <img class="ellipse-violet" src="assets/img/main/Ellipse-violet.svg" alt=""> -->
        <picture>
            <source media="(max-width: 1000px)" srcset="assets/img/main/main-bg-sm.jpg">
            <img src="assets/img/main/main-bg-xl.jpg" alt="">
        </picture>
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

.main-image {
    position: absolute;
    top: 0;
    right: calc((100vw - 1300px)/(1920 - 1300) * (0 + 280) - 280px);
}
.ellipse-violet {
    position: absolute;
    top: 0;
    right: 0;
}

.main-image svg {
    position: relative;
}

.main-image svg img {
    position: absolute; 
    z-index: 20;
    top: 0;
    left: 0;
}

.main-image img {
    max-width: 100%;
    height: auto;
}

@media all and (max-width: 1350px) {
    .main-image {
        right: calc((100vw - 1680px)/(1680 - 1000) * (0 + 160) - 160px );
    }
}

@media all and (max-width: 1000px) {
    .main-image {
        margin-bottom: calc((100vw - 280px)/(1000 - 280) * (130 - 50) + 50px );
        position: static;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .ellipse-violet {
        display: none;
    }
}

@media all and (max-width: 800px) {
    .main-image {
        display: flex;
        position: relative;
        right: auto;
        align-items: flex-end;
    }
}

@media all and (min-width: 1920px) {
    .main-image {
        right: 0;
    }
}


</style>