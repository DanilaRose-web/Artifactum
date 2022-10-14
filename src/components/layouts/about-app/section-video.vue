<template>    
    <section class="video">
        <div class="container-fluid section-video-container">
            <div class="video-wrap">
                <img src="assets/img/section-video/video..jpg" alt="">
                <div class="play-wrap play">
                    <div class="icon-play">
                        <img src="assets/img/section-video/play.svg" alt="">
                    </div>
                </div>
            </div>

            <video-block>
                <video-item>
                    <div class="icon-video-item"><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Выбери маршрут по интересам</template>
                </video-item>

                <video-item>
                    <div class="icon-video-item"><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Участвуй в захватывающей игре с элементами дополненной реальности</template>
                </video-item>

                <video-item>
                    <div class="icon-video-item "><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Исследуй неизвестные и по-новому открывай знакомые места</template>
                </video-item>

                <video-item>
                    <div class="icon-video-item"><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Почувствуй себя искателем сокровищ</template>
                </video-item>

                <video-item>
                    <div class="icon-video-item"><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Получи доступ к сопутствующим трэвел-услугам</template>
                </video-item>

                <video-item>
                    <div class="icon-video-item"><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Соревнуйся с другими путешественниками в поиске кладов</template>
                </video-item>

                <video-item>
                    <div class="icon-video-item"><img src="assets/img/features/features-icon.svg" alt=""></div>
                    <template slot="title">Создавай собственные маршруты</template>
                </video-item>
            </video-block>

            <p class="video-text"><strong>Artifactum</strong> – это путеводитель по необычным местам, где каждый маршрут представляет собой увлекательный квест с элементами дополненной реальности. Это новый формат путешествий, объединяющий познавательный и игровой формат. Вы выбираете программу по своим интересам, посещаете знаковые музеи или идете по живописным горным тропам, а параллельно участвуете в поиске ценных артефактов. Приложение также дает доступ к трэвел-услугам на маршруте: поиску гида, бронированию гостиницы и столиков в ресторанах. </p>
        </div>
    </section>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

        

    }
    
</script>

<style lang="css" scoped>

.video {
    padding-top: 46px;
    padding-bottom: 100px;
    position: relative;
    z-index: 5;
}

.video-wrap {
    margin: 0 auto;
    margin-bottom: 51px;
    max-width: 867px;
    position: relative;
    overflow: hidden;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));  
    transition: all 0.3s ease;
}

.video-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #5D58B7;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 0;
}

.video-wrap img {
    max-width: 100%;
    height: auto;
}

.play-wrap {
    padding: 4px;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    border: 1px solid #5D58B7;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 1;
}

.icon-play {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #5D58B7;
    box-shadow: 0px 0px 44px #FFFFFF;
}

.section-video-container {
    max-width: 1250px;
}

.video-text {
    margin-top: 40px;
    font-weight: 500;
    font-size: 18px;
    line-height: 194%;
    color: #282735;
}

.video-text strong {
    font-weight: 600;
}

.video-wrap:hover::after {
    opacity: 0.3;
    visibility: visible;
}

@media all and (max-width: 700px) {
    .play-wrap {
        width: 60px;
        height: 60px;
    }
}

@media all and (max-width: 450px) {
    .video-text {
        font-size: 16px;
    }
}

@media all and (max-width: 340px) {
    .video-text {
        font-size: 14px;
    }
}

</style>