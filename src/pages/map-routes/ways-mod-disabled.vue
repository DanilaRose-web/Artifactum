<template>
    <layout>
        <header-main @on-click="showMenu"/>

        <section-main :showMenu="!showMenuFlag">
            <table-moderation />
        </section-main>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    
    @Component
    export default class PageWaysModComponent extends Vue {
        showMenuFlag = false;
        showMenu() {
            this.showMenuFlag = !this.showMenuFlag;
        }
    }
</script>

<style lang="css" scoped>



</style>