<template>    
    <button class="app-button btn--animate">
        <svg width="34" height="34"><use xlink:href="assets/img/svg-sprite.svg#app-button"></use></svg>
        <span>Скачать в App Store </span>
    </button>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.app-button {
    max-width: 271px;
    width: 100%;
    height: 61px;
    font-family: 'TT Norms', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 147%;
    color: #FFFFFF;
    background: #FFB83A;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.app-button svg {
    margin-right: 6px;
    fill: white;
}

/* ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КНОПКИ форм
====================================================================== */
.btn--animate {
    display: flex;
    align-items: center;
    text-align: center;
    position: relative;
    transition: .5s;
    overflow: hidden;
}

.btn--animate::before,
.btn--animate::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: #EC9E15;
    top: 0;
    left: -100%;
    opacity: .5;
    transition: .5s;
    z-index: 0;
}

.btn--animate::after {
    opacity: 1;
    transition-delay: .2s;
}

.btn--animate:hover span {
    color: white;
}

.btn--animate:hover svg {
    fill: white;
}

.btn--animate:hover::before,
.btn--animate:hover::after {
    left: 0;
}

.btn--animate span, .btn--animate svg {
    position: relative;
    z-index: 2;
    color: #FFFFFF;
    transition: all 0.4s ease;
}

.btn--animate:active {
    transform: scale(0.95);
}

@media all and (max-width: 570px) {
    .app-button {
        max-width: 80%;
    }
}

@media all and (max-width: 430px) {
    .app-button {
        max-width: 100%;
    }
}

</style>