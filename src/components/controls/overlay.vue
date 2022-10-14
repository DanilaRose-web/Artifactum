<template>    
    <div class="overlay"></div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

    }
    
</script>

<style lang="css" scoped>

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(60, 58, 99, 0);
    visibility: hidden;
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
    z-index: 2;
}

.overlay.show {
    background: rgba(60, 58, 99, 0.8);
    visibility: visible;
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
}

</style>