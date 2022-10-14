<template>    
    <div class="share-item-col col-6">
        <div class="share-item">
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

.share-item-col {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
}

.share-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 276px;
    transition: all 0.3s ease;
}

.share-img {
    margin-bottom: 23px;
    max-width: 127px;
    width: 100%;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.share-img::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.share-img img {
    max-width: 100%;
    height: auto;
    transition: all 0.3s ease;
}

.share-title {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    text-transform: uppercase;
    color: #282735;
}

.share-subtitle {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #737373;
}

.share-item:hover {
    transform: translateY(-10px);
}

.share-item:hover .share-img::after {
    background: #6D69C9;
    visibility: visible;
    opacity: 0.5;
}

.share-item:hover img {
    transform: scale(1.1);
}

@media all and (max-width: 992px) {
    .share-item-col {
        justify-content: center;
    }
}

@media all and (max-width: 576px) {
    .share-item-col {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

</style>