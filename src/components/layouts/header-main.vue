<template>
    <header class="header-absolute">
        <div class="container-fluid header-container">
        <logo />
        <div class="flex-block">
            <nav-menu class="header-menu">
                <li class="menu-item"><r-link route="about-app">О приложении</r-link></li>
                <li class="menu-item"><r-link route="countries">Страны</r-link></li>
                <li class="menu-item"><r-link route="partners">Партнерам и авторам</r-link></li>
                <li class="menu-item"><r-link route="feedback">Обратная связь</r-link></li>

                <select-language />
            </nav-menu>
        

            <nav-button class="header-button enter-button">
              <svg> <use xlink:href="assets/img/svg-sprite.svg#nav-button-personal-area"></use></svg>
              <span>Личный кабинет</span>
            </nav-button>

            <nav-button class="header-button-sm enter-button">
              <svg><use xlink:href="assets/img/svg-sprite.svg#nav-button-feedback"></use></svg>
              <span>Обратная связь</span>
            </nav-button>

            <burger-icon />
        </div>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component
  export default class FooterDefaultComponent extends Vue {
    
  }
</script>

<style lang="css" scoped>
.header-absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 1;
}

.header-container {
  padding: 22px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media all and (max-width: 1350px) {
  .flex-block {
    width: 100%;
    margin-left: 30px;
  }
}

@media all and (max-width: 1150px) {
  .flex-block {
    width: auto;
    margin-left: 30px;
  }
}

@media all and (max-width: 505px) {
  .header-button-sm {
    display: none;
  }
}

@media all and (max-width: 400px) {
  .header-container {
    padding: 10px 15px;
  }
}

</style>