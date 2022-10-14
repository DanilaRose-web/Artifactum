<template>    
    <nav class="user-menu" v-if="!showUserMenu">
        <ul class="user-menu-list">
            <li class="user-menu-item" @click="$router.push({ name: 'page-profile' })"><a>Профиль</a></li>
            <li class="user-menu-item"><a>Настройки</a></li>
            <li class="user-menu-item"><a>Прочее</a></li>
            <li class="user-menu-item" @click="logout"><a >Выйти</a></li>
        </ul>
    </nav>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'

    @Component
    export default  class UserMenuComponent extends Vue{
        @Prop({ type: Boolean, default: false })
        showUserMenu: boolean

        async logout() {
            try { 
                let res = await this.$api.AccountService.logoutAsync()
                this.$router.push({ name: 'sign-in' })
            } catch {}
        }
    }
    
</script>

<style lang="less" scoped>

.user-menu {
    background: #282556;
    box-shadow: 0px 4px 7px rgba(16, 27, 45, 0.25);
    position: absolute;
    right: 0;
    top: 102%;
    width: 100%;
    z-index: 5;
}

.user-menu-item {
    min-height: 35px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
}

.user-menu-item:hover {
    background: #5D58B7;
}

.user-menu-item:not(:first-child) {
    border-top: 1px solid #403D6A;
}

.user-menu-item a {
    padding-left: 28px;
    padding-right: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #CDCEDF;
}

@media all and (max-width: 555px) {
    .user-menu { right: 0; min-width: 188px; }
}

</style>