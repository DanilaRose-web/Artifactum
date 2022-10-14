<template>    
    <div action="" class="signin-form">
        <h2 class="form-title">Вход</h2>

        <!-- <pos-input-label
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
        </pos-input-label> -->


        <div class="form-item">
            <ui-input 
                :placeholder="'Логин'" 
                :type="'email'" 
                :id="'login'" 
                :required="true"
                :min-lenghth="5" 
                :showError="true"
                :hasError="hasError"
                v-model="email"
                :iconLeft="true"
                :requiredLabel="true"> 
            </ui-input>
            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="/assets/img/svg-sprite.svg#icon-input-name"></use></svg>
        </div>

        <div class="form-item">
            <ui-input 
                :placeholder="'Пароль'" 
                :type="'password'" 
                :id="'password'" 
                :required="true"
                :min-lenghth="5" 
                :showError="true"
                :hasError="hasError"
                v-model="password"
                :iconLeft="true"
                :requiredLabel="true"
                @keydown.enter="logIn"> 
            </ui-input>
            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="assets/img/svg-sprite.svg#icon-input-password"></use></svg>
        </div>

        <div class="no-access" v-if="access">Введен неверный логин или пароль</div>

        <div class="signin-form-nav">
            <a class="forget-password">Забыли пароль?</a>
            <button class="signin-button" @click="logIn">Войти</button>
        </div>
    </div>
</template>

<script lang="ts">

    import LoginResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Users/LoginResponse";
    import Vue from "vue";
    import { Component } from 'vue-property-decorator'
    // import {set} from "js-cookie"
    @Component
    export default  class SignFormComponent extends Vue {
        
        emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        passwordRegex: RegExp = /[\w\s А-я_\s\-\.]+$/; //'[\\w\s]+';
        email: string = ''
        password: string = ''
        userEmail: string = ''
        
        
        access = false
        hasError = false
        loginUser: LoginResponse = null

        async logIn() {
            // debugger
            try {
                let req = await this.$api.AccountService.loginAsync({ Email: this.email, Password: this.password })
                if (req) {
                    this.loginUser = req
                    // set("Auth-Token", 'd1df2b09-3e74-465e-8fa4-8485f16fe36b');
                }
                // this.$api.SetUser({ Id: this.loginUser.UserId, Email: this.email, FullName:''})
                
                this.$router.push({ name: 'page-map-routes' })
            } catch {
                this.access = true
                this.hasError = true
            } finally {}
        }
        created() {
            this.email = 'astro_m@mail.ru'
            this.password =  'pynve9-geJcev-fadhuv'
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

.form-item {
    position: relative;
}

.form-item svg {
    position: absolute;
    top: 11px;
    left: 14px;
    fill: #5D58B7;
    z-index: 1;
}

.no-access {
    margin-top: -11px;
    margin-bottom: 20px;
    color: #B10444;
    font-weight: 500;
    font-size: 16px;
    line-height: 20%;
}

.form-item .control-input.has-error + svg {
    fill: #B10444;
}




</style>