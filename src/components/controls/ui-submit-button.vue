<template>    
    <button class="ui-submit-button" @click="$emit('click')">
        <span><slot /></span>
    </button>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class UiSubmitButtonComponent extends Vue {
   
    }
    
</script>

<style lang="less" scoped>


.ui-submit-button {
    background: #5D58B7;
    max-width: 117px;
    width: 100%;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
}

.ui-submit-button:not(:first-child) {
    margin-left: 15px;
}

.bg-red {
    background: #F16063;
}



</style>