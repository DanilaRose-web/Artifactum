<template>    
    <ul class="features-list">
        <li><span>Выбор туристических маршрутов на основании текущего местоположения.</span></li>
        <li><span>Ответ на вопрос: «Что интересного можно здесь посмотреть?», когда хочется получить концентрированные впечатления при ограниченном времени</span></li>
        <li><span>Помощь в планировании путешествия. Познакомьтесь с треками в разных регионах, а красочные фото ключевых локаций послужат дополнительным источником вдохновения</span></li>
        <li><span>Бронирование и оплата гостиниц, кафе, музеев. Трэвел-услуги в одном приложении</span></li>
        <li><span>Возможность делиться фотографиями в социальных сетях и с друзьями в приложении</span></li>
        <li><span>Командные соревнования по поиску кладов. Создавайте пользовательские группы и запускайте в них соревнования по маршруту</span></li>
        <li><span>Каждый месяц - доступ к новым трекам</span></li>
        <li><span>Услуги персонального гида по маршруту</span></li>
        <li><span>Экономия на питании, проживании и досуге благодаря специальным условиям и акциям от наших партнеров</span></li>
    </ul>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

/* .features-list li {
    color: #5D58B7;
    font-size: 22px;
} */

.features-list li:not(:last-child) {
    margin-bottom: 20px;
}

.features-list li span {
    font-weight: 500;
    font-size: 16px;
    line-height: 156%;
    color: #737373;
}

.features-list {
    list-style-type: disc;
}
.features-list span {
    margin-left: 10px;
}
.features-list li {
    color: #5D58B7;
    font-size: 24px;
    display: flex;
    align-items: flex-start;
}
.features-list li:before {
    margin-top: 7px;
    margin-right: 15px;
    content: '';
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    border-radius: 50%;
    background-color: #5D58B7;
}

@media all and (max-width: 350px) {
    .features-list li span { font-size: 14px; }
}

</style>