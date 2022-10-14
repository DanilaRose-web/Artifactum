<template>    
    <h3 class="section-inside-subtitle"><slot /></h3>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.section-inside-subtitle {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    color: #282735;
}

@media all and (max-width: 670px) {
    .section-inside-subtitle {
        font-size: calc((100vw - 280px)/(670 - 280) * (30 - 23) + 23px);
    }
}

@media all and (max-width: 400px) {
    .section-inside-subtitle {
        margin-bottom: 20px;
    }
}

@media all and (min-width: 671px) {
    .section-inside-subtitle {
        font-size: 30px;
    }
}

</style>