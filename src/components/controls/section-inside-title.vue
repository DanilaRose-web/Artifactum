<template>    
    <h2 class="section-inside-title"><slot /></h2>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.section-inside-title {
    margin-bottom: 35px;
    font-weight: 600;
    font-size: 36px;
    line-height: 97%;
    color: #282735;
}

@media all and (max-width: 670px) {
    .section-inside-title {
        font-size: calc((100vw - 280px)/(670 - 280) * (36 - 26) + 26px);
    }
}

@media all and (min-width: 671px) {
    .section-inside-title {
        font-size: 36px;
    }
}

</style>