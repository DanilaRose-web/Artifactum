<template>    
    <div class="table-head" @on-click="$emit('on-click')">
        <slot />
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableHeadComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.table-head {
    margin-bottom: 19px;
    padding-bottom: 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #F0F0F0;
    flex-wrap: wrap;
}

</style>