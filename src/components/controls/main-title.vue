<template>    
    <!-- <h1 class="main-title"><strong>Открывай</strong> новые места в твоем регионе</h1> -->
    <h1 class="main-title">Преврати путешествие в <strong>увлекательную игру!</strong></h1>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.main-title {
    max-width: 670px;
    font-weight: 600;
    font-size: 52px;
    font-size: calc((100vw - 1000px)/(1920 - 1000) * (52 - 41) + 41px);
    line-height: 125%;
    text-transform: uppercase;
    color: #282735;
}

.main-title strong {
    color: #5D58B7;
    font-weight: 800;
}

@media all and (max-width: 1500px) {
    .main-title {
        max-width: calc((100vw - 1000px)/(1500 - 1000) * (630 - 520) + 520px);
    }
}

@media all and (max-width: 1000px) {
    .main-title {
        font-size: calc((100vw - 768px)/(1000 - 768) * (52 - 45) + 45px);
        text-align: center;
        max-width: 710px;
    }
}

@media all and (max-width: 485px) {
    .main-title {
        font-size: calc((100vw - 280px)/(768 - 280) * (45 - 24) + 24px);
        text-align: center;
    }
}

@media all and (min-width: 1501px) {
    .main-title {
        max-width: 670px;
    }
}

@media all and (min-width: 1920px) {
    .main-title {
        font-size: 52px;
    }
}

</style>