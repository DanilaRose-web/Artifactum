<template>    
    <aside class="sidebar col" v-if="!showMenu">
        <div class="sidebar-bg"><img src="assets/img/sidebar-bg.png" alt=""></div>
        <slot />
    </aside>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'

    @Component
    export default  class SidebarComponent extends Vue {
        @Prop({ type: Boolean, default: false })
        showMenu: boolean
    }
    
</script>

<style lang="css" scoped>

.sidebar {
    padding-left: 0;
    padding-right: 0;
    background: #5D58B7;
    max-width: 315px;
    width: 100%;
    /* min-height: 100vh; */
    height: 100%;
    position: relative;
}

.sidebar-bg {
    position: absolute;
    top: 7px;
    left: 14px;
    z-index: 0;
}

.sidebar-bg img {
    max-width: 100%;
    height: auto;
}

@media all and (max-width: 1105px) {
    .sidebar { max-width: 100px; }
}

@media all and (max-width: 860px) {
    .sidebar { max-width: 260px; display: block; position: absolute; z-index: 2; }
}

@media all and (min-width: 861px) {
    .sidebar { display: none; }
}

</style>