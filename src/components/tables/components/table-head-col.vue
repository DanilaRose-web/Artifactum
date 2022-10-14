<template>    
    <div class="table-head-col col">
        <div class="head-col-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableHeadColComponent extends Vue{

    }
    
</script>

<style lang="less" scoped>

.table-head-col {
    padding-left: 0.5px;
    padding-right: 0.5px;
    display: flex;
}

.head-col-content {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #E2E2E2;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #343545;
    min-height: 37px;
    width: 100%;
}

@media all and (max-width: 1666px) {
    .table-moderation {
        .head-col-content {
            padding-left: 10px;
        }
    }
}

</style>