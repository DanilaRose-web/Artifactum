<template>    
    <section class="section-features">
        <about-features-item>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 features-col">
                <features-img>
                    <phone-img />
                    <phone-img class="phone-img-bottom" />
                </features-img>
            </div>

            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 features-col features-col-descr">
                <div class="features-descr">
                    <features-title>Как это работает?</features-title>
                    <features-subtitle>На маршруте вас ждут контрольные точки, достижение которых фиксируется при помощи технологии дополненной реальности. Финальная точка маршрута содержит сундук с сокровищем - артефактом. Это сокровище можно получить только после прохождения всех контрольных точек маршрута. Чем ценнее артефакт, тем больше возможностей у вас есть: вы получаете доступ к новым маршрутам, возможность продать артефакт за криптовалюту на бирже.</features-subtitle>
                </div>
            </div>
        </about-features-item>

        <about-features-item class="features-item-bg">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-2 order-sm-2 order-md-2 order-lg-1 features-col features-col-descr">
                <div class="features-descr features-descr-bg">
                    <features-title>Какие еще возможности дает приложение?</features-title>
                    <features-list></features-list>
                </div>
            </div>
            
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-1 order-sm-1 order-md-1 order-lg-2 features-col">
                <features-img class="features-img-ml">
                    <phone-img />
                    <phone-img class="phone-img-bottom" />
                </features-img>
            </div>
        </about-features-item>
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

.section-features {
    padding-top: 50px;
    background: rgb(229, 229, 229, 0.2);
}

.features-col-descr {
    display: flex;
    align-items: center;
}



@media all and (max-width: 1100px) {
    .features-descr {
        margin-left: 0;
    } 

    .features-descr-bg {
        margin-left: 0;
        margin-right: 0;
    }
}

</style>