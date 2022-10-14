<template>    
    <div class="phone-group">
        <div class="phone-img">
            <img src="assets/img/main/phone-svg.svg" alt="">
        </div>

        <div class="phone-top-screen">
            <img src="assets/img/main/phone-top-screen.svg" alt="">
        </div>

        <div class="phone-bottom-screen">
            <img src="assets/img/main/phone-bottom-screen.svg" alt="">
        </div>

        <div class="circle-points">
            <img src="assets/img/main/circle-points.svg" alt="">
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

    }
    
</script>

<style lang="css" scoped>

.phone-group {
    position: absolute;
    top: 164px;
    left: -20%;
}

.phone-img {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 310px;
    width: 100%;
    background: rgba(116, 101, 253, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgb(255, 255, 255, 0.2);
    border-radius: 40px;
}

.phone-img img, .phone-top-screen img, .phone-bottom-screen img, .circle-points img {
    max-width: 100%;
    height: auto;
    z-index: 1;
}

.phone-top-screen {
    padding: 12px;
    position: absolute;
    top: 51px;
    right: -64%;
    border: 1px solid #FFFFFF;
    backdrop-filter: blur(4px);
    border-radius: 23px;
    z-index: 2;
}

.phone-bottom-screen {
    padding: 10px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #FFFFFF;
    backdrop-filter: blur(10px);
    border-radius: 30px;
    position: absolute;
    bottom: -8%;
    right: -21%;
    z-index: 2;
}

.circle-points {
    position: absolute;
    bottom: -6px;
    left: -65%;
    z-index: -1;
}

@media all and (max-width: 1000px) {
    .phone-group {
        position: absolute;
        top: 100px;
        left: auto;
        right: 240px;
    }
}

@media all and (max-width: 800px) {
    .phone-group {
        position: relative;
        top: auto;
        left: auto;
        right: -25%;
        bottom: -5px;
    }
}

@media all and (max-width: 760px) {
    .phone-img {
        padding: calc((100vw - 280px)/(760 - 280) * (20 - 5) + 5px );
        border-radius: calc((100vw - 280px)/(760 - 280) * (40 - 13) + 13px );
    }

    .phone-top-screen {
        padding: calc((100vw - 280px)/(760 - 280) * (12 - 5) + 5px );
        border-radius: calc((100vw - 280px)/(760 - 280) * (23 - 11) + 11px );
        max-width: calc((100vw - 280px)/(760 - 280) * (283 - 120) + 120px );
        width: 100%;
        top: calc((100vw - 280px)/(760 - 280) * (51 - 20) + 20px );
        right: calc((100vw - 280px)/(760 - 280) * (-64 + 70) - 70% );
    }

    .phone-bottom-screen {
        padding: calc((100vw - 280px)/(760 - 280) * (10 - 5) + 5px );
        border-radius: calc((100vw - 280px)/(760 - 280) * (30 - 11) + 11px );
        max-width: calc((100vw - 280px)/(760 - 280) * (141 - 60) + 60px );
    }
}

</style>