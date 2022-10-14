<template>    
    <div class="phone-img">
        <img src="assets/img/features/features.svg" alt="">
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

.phone-img {
    padding: 17px;
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

.phone-img img {
    max-width: 100%;
    height: auto;
}

.phone-img-bottom {
    margin-left: -100px;
    margin-bottom: -50px;
    position: relative;
}


@media all and (max-width: 760px) {
    .phone-img {
        padding: calc((100vw - 280px)/(760 - 280) * (20 - 9) + 9px );
        border-radius: calc((100vw - 280px)/(760 - 280) * (40 - 19) + 19px );
    }
}

</style>