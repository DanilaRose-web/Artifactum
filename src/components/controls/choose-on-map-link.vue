<template>    
    <a route="" class="choose-on-map" @click="$emit('on-show-modal-map')">Выбрать на карте</a>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class ChooseOnMapLinkComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.choose-on-map {
    display: inline-block;
    margin-top: 7px;
    margin-bottom: 26px;
    font-weight: 600;
    font-size: 12px;
    line-height: 25px;
    text-decoration-line: underline;
    text-transform: uppercase;
    cursor: pointer;
    color: #5D58B7;
}

</style>