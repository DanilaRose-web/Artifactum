<template>    
    <h1 class="develop-title"><slot /></h1>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

    }
    
</script>

<style lang="css" scoped>

.develop-title {
    margin: 40px 0;
    color: black;
    font-size: 30px;
    font-weight: 600;
    line-height: 116%;
    text-align: center;
}

</style>