<template>    
    <h1><slot /></h1>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableTitleComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

h1 {
    margin-bottom: 5px;
    margin-right: 15px;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: #162147;
}

</style>