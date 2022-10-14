<template>    
    <h2 class="popup-title"><slot /></h2>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

    }
    
</script>

<style lang="css" scoped>

.popup-title {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #282735;
    width: 100%;
}

</style>