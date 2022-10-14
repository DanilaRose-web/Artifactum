<template>    
    <p class="inside-text"><slot /></p>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.inside-text {
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 17px;
    line-height: 190%;
    color: #282735;
}

@media all and (max-width: 670px) {
    .inside-text {
        font-size: calc((100vw - 280px)/(670 - 280) * (17 - 14) + 14px);
    }
}

@media all and (min-width: 671px) {
    .inside-text {
        font-size: 17px;
    }
}

</style>