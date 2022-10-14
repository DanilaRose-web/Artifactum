<template>    
    <div class="table-row row">
        <slot />
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableRowComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.table-row {
    margin-bottom: 2px;
    margin-left: -0.5px;
    margin-right: -0.5px;
    flex-wrap: nowrap;
}

</style>