<template>    
    <section class="advantages">
        <advantages-block />
    </section>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

    }
    
</script>

<style lang="css" scoped>

.advantages {
    padding: 75px 0 0 0;
    background: url('/assets/img/advantages/bg.jpg') no-repeat center;
    background-size: cover;
}

</style>