<template>    
    <h2 class="features-title"><span><slot /></span></h2>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script> 

<style lang="css" scoped>

.features-title {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: calc((100vw - 992px)/(1100 - 992) * (36 - 30) + 30px);
    line-height: 116%;
    color: #282735;
}

@media all and (max-width: 992px) {
    .features-title { font-size: 36px; text-align: center; }
}

@media all and (max-width: 576px) {
    .features-title {
        font-size: calc((100vw - 280px)/(576 - 280) * (36 - 22) + 22px);
    }
} 

@media all and (max-width: 400px) {
    .features-title { margin-bottom: 20px; }
}

@media all and (min-width: 1101px) {
    .features-title {
        font-size: 36px;
    }
}

</style>