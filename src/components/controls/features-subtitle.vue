<template>    
    <h5 class="features-subtitle"><span><slot /></span></h5>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script> 

<style lang="css" scoped>

.features-subtitle {
    font-weight: 500;
    font-size: 20px;
    font-size: calc((100vw - 992px)/(1100 - 992) * (20 - 18) + 18px);
    line-height: 35px;
    color: #737373;
}

@media all and (max-width: 992px) {
    .features-subtitle { font-size: 20px; text-align: center; }
}

@media all and (max-width: 576px) {
    .features-subtitle { font-size: calc((100vw - 280px)/(576 - 280) * (20 - 16) + 16px); line-height: 25px; }
}

@media all and (min-width: 1101px) {
    .features-subtitle {
        font-size: 20px;
    }
}

</style>