<template>    
    <button class="form-button btn--animate" @click="$emit('on-click')">
        <span><slot/></span>
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

.form-button {
    margin-top: 37px;
    min-height: 61px;
    max-width: 148px;
    width: 100%;
    background: #6D69C9;
    border-radius: 10px;
    font-weight: 500;
    font-size: 17px;
    line-height: 147%;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.no-mt {
    margin-top: 0;
}

@media all and (max-width: 330px) {
    .form-button { width: 100%; max-width: 100%; }
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
    background: #46438D;
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

</style>