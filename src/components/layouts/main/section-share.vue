<template>    
    <section class="section-share">
        <div class="share-content container-fluid">
            <div class="row">
                <div class="share-content-col col order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2">
                    <descr-block>
                        <section-title class="ta-left title-center"><p :style="getStyle()">Создавай</p> <strong>свои маршруты</strong> и делись ими</section-title>
                        <subtitle class="subtitle-center subtitle-media-lg">Давно хотел зарабатывать на путешествиях? Теперь у тебя есть такая возможность даже в условиях ограничений</subtitle>
                        <subtitle class="ta-center subtitle-media-sm">
                            <p>Идейные соображения высшего порядка, а также укрепление и развитие структуры представляет собой интересный эксперимент</p>
                            <p>соображения высшего порядка, а также укрепление и развитие структуры представляет собой интересный эксперимент</p>
                        </subtitle>

                        <button-group />
                    </descr-block>
                </div>
    
                <div class="share-content-col col order-xl-2 order-lg-2 order-md-1 order-sm-1 order-1">
                    <share-block />
                </div>
            </div>
        </div>


        <div class="section-bg">
            <img src="assets/img/share/circle-bg.png" alt="">
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
                'display': 'block'
            }
        }
    }
    
</script>

<style lang="css" scoped>

.share-content-col {
    padding: 0 15px;
    display: flex;
}

.share-content-col:first-child {
    flex: 0 0 48%;
    max-width: 48%;
}
.share-content-col:last-child {
    flex: 0 0 52%;
    max-width: 52%;
}

.section-share {
    padding-top: 93px;
    padding-bottom: 99px;
    background: rgb(229, 229, 229, 0.2);
    background-position: right 5%;
    background-size: contain;
    position: relative;
}

.share-content {
    max-width: 1280px;
    display: flex;
    align-items: flex-start;
}

.section-bg {
    overflow: hidden;
    position: absolute;
    top: 20px;
    right: calc((100vw - 1300px)/(1920 - 1300) * (0 + 250) - 250px );;
    z-index: -1;
}

@media all and (max-width: 992px) {
    .share-content-col:first-child {
        justify-content: center;
        flex: 0 0 100%;
        max-width: 100%;
    }
    .share-content-col:last-child {
        justify-content: center;
        flex: 0 0 100%;
        max-width: 100%;
    }

    .subtitle-center {
        margin: 0 auto;
        margin-top: 25px;
        text-align: center;
    }

    .share-content-col:first-child {
        margin-top: 62px;
    }
}

@media all and (max-width: 950px) {
    .section-share {
        padding-bottom: 63px;
        background: #F6F5EF;
    }
}

</style>