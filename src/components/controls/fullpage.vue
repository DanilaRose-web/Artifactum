<template>    
    <div class="fullpage">
        <slot />
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

.fullpage {
    margin: 0 auto;
    max-width: 1920px;
    width: 100%;
    height: 100%;
    position: relative;
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
    overflow: hidden;
}



.fullpage.hide {
    /* overflow: hidden; */
    -webkit-transform: translateX(-400px);
    transform: translateX(-400px);
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
}

.fullpage.hide-enter {
    -webkit-transform: translateX(-625px);
    transform: translateX(-625px);
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
}



</style>