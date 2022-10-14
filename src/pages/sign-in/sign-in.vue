<template>
    <layout>
        <section class="signin">
            <div class="signin-block">
                <logo />
                <signin-form />
            </div>
        </section>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    
    @Component
    export default class PageSignInComponent extends Vue {
        
    }
</script>

<style lang="css" scoped>

.signin {
    width: 100%;
    min-height: 100vh;
    background: #17162b url('/assets/img/sign-bg3.png') no-repeat center;
    background-size: cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.signin::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.signin-block {
    position: relative;
    background: transparent;
}

</style>