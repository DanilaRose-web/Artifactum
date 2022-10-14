<template>    
    <div class="table">
        <slot />
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableMainComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.table {
    margin-top: 29px;
    padding: 14px 26px 41px 26px;
    background: white;
    width: 100%;
}

.table-users {
    max-width: 1100px;
}

.table-ways {
    max-width: 1150px;
}

.table-dots {
    max-width: 971px;
}

.table-moderation {
    max-width: 1192px;
}

</style>