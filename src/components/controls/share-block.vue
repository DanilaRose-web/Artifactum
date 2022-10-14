<template>    
  
    <div class="share-block">
        <share-item>
            <div class="share-img"><img src="assets/img/share/img1.jpg" alt="Картинка1"></div>
            <div class="share-title">Создай интересный маршрут или квест</div>
            <div class="share-subtitle">Делись своими любимыми местами и вдохновляй других на путешествия!</div>
        </share-item>

        <share-item>
            <div class="share-img"><img src="assets/img/share/img2.jpg" alt="Картинка1"></div>
            <div class="share-title">Пользуйся вознаграждениями от партнеров</div>
            <div class="share-subtitle">30% от стоимости рекламы, размещенной на вашем маршруте, отправляется на ваш счет.</div>
        </share-item>

        <share-item>
            <div class="share-img"><img src="assets/img/share/img3.jpg" alt="Картинка1"></div>
            <div class="share-title">Зарабатывай на программах</div>
            <div class="share-subtitle">Авторы самых популярных маршрутов получают выплаты. Вы также можете сделать свой маршрут платным и получать деньги от каждого прохождения.</div>
        </share-item>

        <share-item>
            <div class="share-img"><img src="assets/img/share/img4.jpg" alt="Картинка1"></div>
            <div class="share-title">Следи за популярностью и получай лайки</div>
            <div class="share-subtitle">Собирай обратную связь, улучшай маршрут и получай больше прохождений. Чем больше людей пройдет твой маршрут, тем больше ты заработаешь!</div>
        </share-item>
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

.share-block {
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
}

</style>