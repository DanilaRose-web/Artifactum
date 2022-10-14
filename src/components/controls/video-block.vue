<template>    
    <div class="video-block">
        <div class="row video-row">
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

.video-row {
    margin-left: -6px;
    margin-right: -6px;
}

</style>