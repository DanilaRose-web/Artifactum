<template>    
    <button class="head-button" @click="$emit('on-click')">
        <span><slot /></span>
    </button>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableHeadButtonComponent extends Vue {
    }
    
</script>

<style lang="css" scoped>

.head-button {
    background: #5D58B7;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    max-width: 174px;
    width: 100%;
    min-height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>