<template>
  <button class="nav-button btn--animate">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FooterDefaultComponent extends Vue {}
</script>

<style lang="css" scoped>
.nav-button {
  padding: 16px 28px;
  font-family: "TT Norms", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;
  background: #46438d;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.nav-button svg {
  margin-right: 11px;
  max-width: 15px;
  max-height: 15px;
  fill: #ffb83a;
}

/* ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КНОПКИ форм
====================================================================== */
.btn--animate {
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  transition: 0.5s;
  overflow: hidden;
}

.btn--animate::before,
.btn--animate::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: #726CE2;
  top: 0;
  left: -100%;
  opacity: 0.5;
  transition: 0.5s;
  z-index: 0;
}

.btn--animate::after {
  opacity: 1;
  transition-delay: 0.2s;
}

.btn--animate:hover span {
  color: white;
}

.btn--animate:hover svg {
  fill: #ffb83a;
}

.btn--animate:hover::before,
.btn--animate:hover::after {
  left: 0;
}

.btn--animate span,
.btn--animate svg {
  position: relative;
  z-index: 2;
  color: #ffffff;
  transition: all 0.4s ease;
}

.btn--animate:active {
  transform: scale(0.95);
}

.header-button,
.header-button-sm {
  display: none;
}

.burger-button {
    margin-top: 25px;
}

@media all and (max-width: 1150px) {
  .header-button-sm {
    display: flex;
  }
}

@media all and (min-width: 1151px) {
  .header-button {
    display: flex;
  }
}
</style>