<template>    
    <section class="bun">
        <div class="container-fluid">
            <section-title class="title-small">ЧТО ВЫ ПОЛУЧАЕТЕ ЗА <strong>АРТЕФАКТЫ</strong></section-title>
            <subtitle class="ta-center subtitle-media-lg">Артефакт может иметь ценность во внутриигровой валюте, в подарке от партнёра трека, реальную ценность от автора. Артефакт, так же может предоставлять особые премиальные возможности в приложении и давать доступ к эксклюзивным квестам и маршрутам в вашем регионе</subtitle>
            <subtitle class="ta-center subtitle-media-sm">
                <p>Проходя каждый этап квеста вы получаете артефакт или золото. <strong>Артефакт</strong> - это подарок или скидка от компании. Нажав на кнопку “где получить”, вы увидите на карте места, в которых возможно будет воспользоваться артефактом.</p>
                <p>Если вы не хотите использовать ту или иную скидку, ее возможно будет продать на базаре, где так же за имеющееся золото сможете купить нужный вам артефакт.</p>
            </subtitle>

            <bun-block />

            <div class="bun-img">
                <img src="assets/img/bun/bg.jpg" alt="Подарки">
            </div>
        </div>
    </section>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.bun {
    padding-top: 60px;
    padding-bottom: 66px;
}

.bun-img {
    margin: 0 auto;
    margin-top: 60px;
    max-width: 567px;
}

.bun-img img {
    max-width: 100%;
    height: auto;
}

</style>