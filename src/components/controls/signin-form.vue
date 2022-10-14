<template>    
    <div action="" class="signin-form">
        <h2 class="form-title">Вход</h2>

        <pos-input-label
            ref="email"
            label=""
            v-model="email"
            htmlClass="signin-form-item"
            name="email"
            type="email"
            placeholder="Логин"
            :required="true"
            :regex="emailRegex">
            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="assets/img/svg-sprite.svg#icon-input-name"></use></svg>
        </pos-input-label>

        <pos-input-label
            ref="password"
            label=""
            v-model="password"
            htmlClass="signin-form-item"
            name="password"
            type="password"
            placeholder="Пароль"
            :required="true"
            :regex="passwordRegex">
            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="assets/img/svg-sprite.svg#icon-input-password"></use></svg>
        </pos-input-label>

        <div class="signin-form-nav">
            <a class="forget-password">Забыли пароль?</a>
            <button class="signin-button" @click="logIn">Войти</button>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class SignFormComponent extends Vue {
        
        emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        passwordRegex: RegExp = /[\w\s А-я_\s\-\.]+$/; //'[\\w\s]+';
        email: string = ''
        password: string = ''

        async logIn() {
            try {
                let res = await this.$api.AccountService.loginAsync({ Email: this.email, Password: this.password,  })
                this.$router.push({ name: 'users' })
            } catch {
                console.log();
            } finally {}
        }

    }
    
</script>

<style lang="css" scoped>

.signin-form {
    margin-top: 22px;
    padding: 0 61px;   
    min-width: 390px;
    background: white;
}

.form-title {
    padding-top: 32px;
    margin-bottom: 27px;
    font-style: 600;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #343545;
    text-align: center;
}

.signin-form-nav {
    padding-bottom: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.forget-password {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #5D58B7;
    cursor: pointer;
    position: relative;
    text-decoration: none;
}


.forget-password::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background:#5D58B7;
    transition: all 0.2s ease;
}

.forget-password:hover::after {
    width: 0;
}

.signin-button {
    font-family: 'Proxima Nova', sans-serif;
    background: #FFB83A;
    max-width: 99px;
    min-height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 17px;
    font-weight: 500;
    color: #FFFFFF;
}

</style>