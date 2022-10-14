<template>    
    <div class="kvest-block">
        <slot />
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

.kvest-block {
    max-width: 540px;
}

</style>