<template>    
    <div class="burger-bg">
        <img src="assets/img/popup-ellipse.svg" alt="">
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

        

    }
    
</script>

<style lang="css" scoped>

.burger-bg {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
}

.burger-bg img {
    max-width: 100%;
    height: auto;
}

</style>