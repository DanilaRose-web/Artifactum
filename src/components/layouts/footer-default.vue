<template>    
    <footer>
        <div class="container-fluid footer-container">
            <div class="row flex-block" style="width: 100%;">
                <div class="col-2 flex-col order-1 order-xl-1"><logo class="footer-logo" /></div>
                <div class="col-6 flex-col order-4 order-xl-2">
                    <nav-menu class="footer-menu">
                        <li class="menu-item"><r-link route="about-app">О приложении</r-link></li>
                        <li class="menu-item"><r-link route="countries">Страны</r-link></li>
                        <li class="menu-item"><r-link route="idea">Идея</r-link></li>
                        <li class="menu-item"><r-link route="feedback">Обратная связь</r-link></li>
                        <li class="menu-item"><r-link route="contacts">Контакты</r-link></li>
                    </nav-menu>
                </div>
                
                <div class="col-2 flex-col order-2 order-xl-3"><social-block /></div>
                <div class="col-2 flex-col order-3 order-cl-4"><button-feedback-footer /></div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

footer {
    padding: 38px 0;
    background: rgb(229, 229, 229, 0.2);
}

.footer-container {
    display: flex;
    justify-content: center;
}

.flex-block {
    margin-right: -15px;
    margin-left: -15px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
}

.flex-col {
    display: flex;
    align-items: center;
}

.flex-col:nth-child(1) {
    padding-left: 0;
    padding-right: 0;
    flex: 0 0 17%;
    max-width: 17%;
}

.flex-col:nth-child(2) {
    padding-left: 0;
    padding-right: 0;
    flex: 0 0 48%;
    max-width: 48%;
}

.flex-col:nth-child(3) {
    padding-left: 0;
    padding-right: 0;
    flex: 0 0 13%;
    max-width: 13%;
}

.flex-col:nth-child(4) {
    padding-left: 0;
    padding-right: 0;
    flex: 0 0 16%;
    max-width: 16%;
}

.no-bg {
    background: white;
}

@media all and (max-width: 1200px) {
    .flex-col {
        display: flex;
        justify-content: center;
    }
    .flex-col:nth-child(1) {
        padding-left: 0;
        padding-right: 0;
        flex: 0 0 33.3333%;
        max-width: 33.3333%;
    }
    .flex-col:nth-child(2) {
        margin-top: 30px;
        flex: 0 0 100%;
        max-width: 100%;
        display: flex;
       justify-content: center;
    }

    .flex-col:nth-child(3) {
        padding-left: 0;
        padding-right: 0;
        flex: 0 0 33.3333%;
        max-width: 33.3333%;
    }

    .flex-col:nth-child(4) {
        padding-left: 0;
        padding-right: 0;
        flex: 0 0 33.3333%;
        max-width: 33.3333%;
    }
}

@media all and (max-width: 576px) {
    .flex-col:nth-child(1) {
        margin-bottom: 30px;
        flex: 0 0 100%;
        max-width: 100%;
    }

    .flex-col:nth-child(3) {
        flex: 0 0 50%;
        max-width: 50%;
    }

    .flex-col:nth-child(4) {
        flex: 0 0 50%;
        max-width: 50%;
    }
}

@media all and (max-width: 420px) {
    .flex-col:nth-child(3) {
        margin-bottom: 30px;
        flex: 0 0 100%;
        max-width: 100%;
    }

    .flex-col:nth-child(2) {
        margin-top: 0;
    }

    .flex-col:nth-child(4) {
        margin-bottom: 30px;
        flex: 0 0 100%;
        max-width: 100%;
    }
}

</style>