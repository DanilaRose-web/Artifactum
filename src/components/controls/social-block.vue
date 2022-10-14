<template>    
    <div class="share-block-social">
        <r-link route="main" target="_blank" class="share-link btn--animate">
            <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#facebook"></use></svg>
        </r-link>

        <r-link route="main" target="_blank" class="share-link btn--animate">
            <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#twitter"></use></svg>
        </r-link>

        <r-link route="main" target="_blank" class="share-link btn--animate">
            <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#instagram"></use></svg>
        </r-link>
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

.share-block-social {
    /* margin-right: 40px;
    margin-left: 10px; */
    display: flex;
    align-items: center;
}

.share-link {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #5D58B7;
    box-shadow: 0px 22px 44px -12px rgba(249, 107, 92, 0.5);
    border-radius: 5px;
    transition: all 0.2s ease;
}

.share-link:not(:last-child) {
    margin-right: 8px;
}

.share-link svg {
    fill: white;
    transition: all 0.2s ease;
}

/* ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КНОПКИ форм
====================================================================== */
.btn--animate {
    display: flex;
    align-items: center;
    text-align: center;
    position: relative;
    transition: .3s;
    overflow: hidden;
}

.btn--animate::before,
.btn--animate::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: #3F3B98;
    top: 0;
    left: -100%;
    opacity: .5;
    transition: .3s;
    z-index: 0;
}

.btn--animate::after {
    opacity: 1;
    transition-delay: .1s;
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
    transition: all 0.3s ease;
}

.btn--animate:active {
    transform: scale(0.95);
}

</style>