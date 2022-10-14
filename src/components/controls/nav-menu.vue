<template>
  <nav class="menu">
    <ul class="menu-list">
      <slot />
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FooterDefaultComponent extends Vue {}
</script>

<style lang="css" scoped>
.menu {
  display: flex;
  align-items: center;
}

.menu-list {
  display: flex;
  align-items: center;
}

.menu-item {
  margin-right: 15px;
  position: relative;
}

.menu-item a {
  padding: 10px 10px;
  font-weight: 600;
  font-size: 15px;
  line-height: 12px;
  color: #3b4844;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  transition: all 0.1s ease;
}

.menu-item a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #46438d;
  z-index: -1;
  animation: afterLink1 0.5s ease forwards;
}

.menu-item a:hover {
  color: white;
  transition-delay: 0.3s;
}

.menu-item a:hover::after {
  /* width: 100%;
    height: 100%; */
  animation: afterLink2 0.5s ease forwards;
}

@keyframes afterLink2 {
  0% {
    width: 0;
    height: 2px;
  }
  50% {
    width: 100%;
    height: 2px;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}

@keyframes afterLink1 {
  100% {
    width: 0;
    height: 2px;
  }
  50% {
    width: 100%;
    height: 2px;
  }
  0% {
    width: 100%;
    height: 100%;
  }
}

/* @media all and (max-width: 1600px) {
    .menu {
        margin-right: 40px;
    }
} */

@media all and (max-width: 1150px) {
  .header-menu {
    display: none;
  }
}

@media all and (max-width: 1200px) {
  .footer-menu ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .footer-menu li:not(:last-child) {
    margin-bottom: 10px;
  }

  .footer-menu ul a {
    font-size: 17;
    font-weight: 700;
  }
}

@media all and (max-width: 1170px) {
  .menu-item {
    margin-right: 10px;
  }
}

</style>