<template>
  <div class="layout-router">
    <header-main @on-show-menu="showMenu" @on-click="showUserMenu" :showUserMenu="!showUserMenuFlag"/>
    <div class="row main-row">
      <sidebar :showMenu="!showMenuFlag">
        <router-view name="menu"></router-view>
      </sidebar>

      <sidebar-lg>
        <router-view name="menu"></router-view>
      </sidebar-lg>

      <div class="content-all col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
//import { UserRole } from "@dataSource/Models/Users/User";

@Component
export default class LayoutRouterComponent extends Vue {
  constructor() {
    super();
    // console.log("LayoutComponent created");
  }

  showMenuFlag = true
  showUserMenuFlag = true
  showMenu() {
    this.showMenuFlag = !this.showMenuFlag
  }

  showUserMenu() {
    this.showUserMenuFlag = !this.showUserMenuFlag
  }

  mounted() {
    document.title = this.$route.meta.title;
  }

}
</script>

<style lang="css" scoped>

.main-row {
    margin-left: 0;
    margin-right: 0;
    background: #E7E7F2;
    min-height: calc(100vh - 74px);
}

.content-all {
    padding-bottom: 30px;
    width: calc(100% - 315px);
    /* min-height: 100vh; */
}

@media all and (max-width: 1105px) {
    .content-all { width: calc(100% - 100px); padding-bottom: 30px; }
}

@media all and (max-width: 860px) {
    .content-all { width: calc(100% - 260px); }
    .sidebar { height: calc(100% - 74px); }
}

</style>
