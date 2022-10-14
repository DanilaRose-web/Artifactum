<template>    
    <section class="section-about">
        <h3 class="section-subtitle">О приложении</h3>
        <section-title class="media-lg fz-38">Уникальные маршруты и квесты с элементами <strong>дополненной реальности</strong></section-title>
        <section-title class="media-sm">ПУТЕШЕСТВУЙТЕ C <strong>УДОВОЛЬСТВИЕМ!</strong></section-title>

        <div class="app-block container-fluid">
            <app-image />
            <kvest-block>
                <kvest-item>
                    <div class="icon-kvest"><img src="assets/img/app/kvest1.svg" alt=""></div>
                    <template slot="title">Выбери маршрут по интересам.</template>
                    <template slot="subtitle">Сортировка по фильтрам поможет составить путешествие твоей мечты.</template>
                </kvest-item>

                <kvest-item>
                    <div class="icon-kvest icon-kvest-light"><img src="assets/img/app/kvest2.svg" alt=""></div>
                    <template slot="title">Посещай живописные места.</template>
                    <template slot="subtitle">Самые интересные локации от местных жителей и влюбленных в регион</template>
                </kvest-item>

                <kvest-item>
                    <div class="icon-kvest "><img src="assets/img/app/kvest3.svg" alt=""></div>
                    <template slot="title">Проходи интересные квесты.</template>
                    <template slot="subtitle">Принципиально новый опыт от путешествий, где эмоции от познания нового усиливаются инструментами дополненной реальности</template>
                </kvest-item>

                <kvest-item>
                    <div class="icon-kvest icon-kvest-light"><img src="assets/img/app/kvest4.svg" alt=""></div>
                    <template slot="title">Участвуй в поиске ценных артефактов. </template>
                    <template slot="subtitle">Идейные соображения высшего порядка</template>
                </kvest-item>

                <kvest-item>
                    <div class="icon-kvest"><img src="assets/img/app/kvest5.svg" alt=""></div>
                    <template slot="title">Получай подарки от наших партнеров.</template>
                    <template slot="subtitle">Скидки в кафе, ресторанах, гостиницах</template>
                </kvest-item>
            </kvest-block>
        </div>

        <div class="section-bg">
            <img src="assets/img/app/app-bg.svg" alt="">
        </div>
    </section>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{
        getStyle() {
            return {
                'font-size': '38px',
                'max-width': '912px'
            }
        }
    }
    
</script>

<style lang="css" scoped>

.app-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.section-bg {
    position: absolute;
    top: 65px;
    left: calc((100vw - 950px)/(1920 - 950) * (0 + 450) - 450px );
    z-index: -1;
}

.section-bg img {
    max-width: 100%;
    height: auto;
}

.section-about {
    padding-bottom: 93px;
    padding-top: 58px;
    position: relative;
    background: rgb(229, 229, 229, 0.2);
    background-size: contain;
}

.section-subtitle {
    margin: 0 auto;
    margin-bottom: 25px;
    font-weight: 600;
    font-size: 20px;
    line-height: 125%;
    color: #5D58B7;
    text-align: center;
    text-transform: uppercase;
}

.app-block {
    display: flex;
    align-items: center;
}

@media all and (min-width: 1920px) {
    .section-bg {
        left: 0;
    }
}

@media all and (max-width: 950px) {
    .section-about {
        background: #F6F5EF;
    }

    .app-block {
        flex-direction: column;
        align-items: center;
    }

    .section-bg {
        top: 260px;
        left: calc((100vw - 500px)/(950 - 500) * (-100 + 340) - 340px);
        max-width: 572px;
    }
}

@media all and (max-width: 540px) {
    .section-bg {
        top: 220px;
        max-width: 500px;
        left: calc((100vw - 280px)/(540 - 280) * (-250 + 340) - 340px);
    }
}

@media all and (max-width: 460px) {
    .section-bg {
        top: 220px;
        max-width: 440px;
        left: calc((100vw - 280px)/(540 - 280) * (-150 + 340) - 340px);
    }
}

@media all and (max-width: 400px) {
    .section-bg {
        top: 210px;
        max-width: 260px;
        left: calc((100vw - 280px)/(540 - 280) * (-80 + 150) - 150px);
    }
}
</style>