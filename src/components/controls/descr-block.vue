<template>    
    <div class="descr-block">
        <div class="container-fluid descr-block-container">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.descr-block {
    position: relative;
    z-index: 1;
}

.descr-block-container {
    padding: 0;
}

</style>