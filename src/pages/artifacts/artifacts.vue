<template>
    <layout>
        <table-quest>Артефакты</table-quest>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    
    @Component
    export default class PageArtifactsComponent extends Vue {
        showMenuFlag = false;
        showMenu() {
            this.showMenuFlag = !this.showMenuFlag;
        }

    }
</script>

<style lang="css" scoped>



</style>