<template>
  <div class="locale">
    <span class="ru">Рус</span>
    <span class="en disabled">En</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FooterDefaultComponent extends Vue {}
</script>

<style lang="css" scoped>
.locale {
  margin-left: 20px;
  margin-right: 65px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.2px;
  color: #3b4844;
}

.locale span:first-child {
  margin-right: 10px;
}

.disabled {
  color: rgba(59, 72, 68, 0.4);
}

@media all and (max-width: 1680px) {
  .locale {
    margin-left: 0;
    margin-right: 90px;
  }
}

@media all and (max-width: 1150px) {
  .locale {
    display: none;
  }

  .locale--burger {
      margin-bottom: 25px;
      display: flex;
      font-size: 17px;
      font-weight: 500;
  }
}
</style>