<template>    
    <div class="bun-block">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 bun-col">
                <div class="bun-item">
                    <div class="bun-icon"><img src="assets/img/bun/bun-icon.svg" alt=""></div>
                    <div class="bun-text">Подарок от партнера <br /> проекта</div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 bun-col">
                <div class="bun-item">
                    <div class="bun-icon"><img src="assets/img/bun/bun-icon.svg" alt=""></div>
                    <div class="bun-text">Доступ к премиальным возможностям приложения: эксклюзивным квестам и маршрутам, ценным призам</div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-5 col-lg-5 ol-xl-5 bun-col">
                <div class="bun-item">
                    <div class="bun-icon"><img src="assets/img/bun/bun-icon.svg" alt=""></div>
                    <div class="bun-text">Стоимость во внутриигровой валюте. Именно с помощью нее ты можешь обмениваться артефактами, открывать новые интересные маршруты</div>
                </div>
            </div>
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

.bun-block {
    margin-top: 40px;
}

.bun-col {
    margin-bottom: 20px;
    display: flex;
}

.bun-item {
    display: flex;
    align-items: flex-start;
    width: 100%;
}

.bun-icon {
    margin-right: 15px;
    width: 18px;
    height: 18px;
}

.bun-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #737373;
}

@media all and (max-width: 992px) {
    .bun-item { flex-direction: column; align-items: center; }
    .bun-text { text-align: center; }
    .bun-icon { margin-bottom: 10px; }
}

</style>