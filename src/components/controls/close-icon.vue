<template>    
    <div class="close-icon">
        <img src="assets/img/close.svg" alt="">
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

.close-icon {
    cursor: pointer;
    z-index: 4;
    position: fixed;
    top: 35px;
    left: 35px;
}

.popup-close {
    top: 18px;
    right: 18px;
    position: absolute;
    left: auto;
}

</style>