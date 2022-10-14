<template>
  <section class="enter-pa">
    <close-icon />
    <div class="enter-block">
      <h3 class="enter-title">Вход</h3>

      <div class="tab-block">
        <div
          class="tab"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="changeActiveTab(tab)"
          :class="{ activeTab: selectedTab === tab }">{{ tab }}</div>
      </div>

      <div class="content-block">
        <div v-show="selectedTab === 'Партнер по рекламе'" class="form">
            <pos-input-label
                ref="email"
                label="Введите e-mail"
                v-model="email"
                htmlClass=""
                name="email"
                type="email"
                placeholder="example@gmail.com"
                :required="true"
                :regex="emailRegex">
                <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#email-input-icon"></use></svg>
            </pos-input-label>

            <pos-input-label
                ref="password"
                label="Введите пароль"
                v-model="password"
                htmlClass=""
                name="password"
                :type="type[0].type"
                placeholder="*******"
                :required="true"
                :regex="passwordRegex">
                <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#password-key-input"></use></svg>
                <svg width="15" class="eye" v-if="type[0].type == 'password'" @click="currentType(0)" height="15" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-show"></use></svg>
                <svg width="15" class="hide" v-else @click="currentType(0)" height="13" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-hide"></use></svg>
            </pos-input-label>

            <div class="flex-block">
              <form-button class="no-mt" @on-click="next()">Войти</form-button>
              <div class="forget-password">Забыли пароль?</div>
            </div>
        </div>
        <div v-show="selectedTab === 'Автор'" class="form">
            <pos-input-label
                ref="email2"
                label="Введите e-mail"
                v-model="email2"
                htmlClass=""
                name="email2"
                type="email"
                placeholder="example@gmail.com"
                :required="true"
                :regex="email2Regex">
                <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#email-input-icon"></use></svg>
            </pos-input-label>

            <pos-input-label
                ref="password2"
                label="Введите пароль"
                v-model="password2"
                htmlClass=""
                name="password2"
                :type="type[1].type"
                placeholder="*******"
                :required="true"
                :regex="password2Regex">
                <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#password-key-input"></use></svg>
                <svg width="15" class="eye" v-if="type[1].type == 'password'" @click="currentType(1)" height="15" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-show"></use></svg>
                <svg width="15" class="hide" v-else @click="currentType(1)" height="13" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-hide"></use></svg>
            </pos-input-label>

            <div class="flex-block">
              <form-button class="no-mt" @on-click="next2()">Войти</form-button>
              <div class="forget-password">Забыли пароль?</div>
            </div>
        </div>
      </div>

      
    </div>

    <popup-bg />
    <overlay />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FooterDefaultComponent extends Vue {

  selectedTab = "Партнер по рекламе";
  tabs: string[] = ["Партнер по рекламе", "Автор"];
  changeActiveTab(tab: string) {
    this.selectedTab = tab;
  }
  
  getStyle() {
    return {
      /* можно перечислять сssсвойства */
      // background: 'white',
      // 'border-left': '2px'
    }
  }
  mounted() {
    
  }

  isClickedContinue: boolean = false;
        emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        passwordRegex: RegExp = /[\w\s\d]+$/;

        email2Regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        password2Regex: RegExp = /[\w\s\d]+$/;

        email: string = "";
        password: string = "";
        email2: string = "";
        password2: string = "";
        
        type: {
           name: string,
           type: string 
        } [] = [{name: 'password', type: 'password'}, {name: 'password2', type: 'password'}];

        next() {
            this.isClickedContinue = true;
            //если проходит валидация
            if ( !this.GetRef("email").checkValidation() && !this.GetRef("password").checkValidation()) {
            return;
            } else if ( !this.GetRef("email").checkValidation() || !this.GetRef("password").checkValidation()) {
            return;
            } 
        }

        next2() {
          if ( !this.GetRef("email2").checkValidation() && !this.GetRef("password2").checkValidation()) {
              return;
            } else if (!this.GetRef("email2").checkValidation() || !this.GetRef("password2").checkValidation()) {
              return
            }
        }

        currentType(indexInput: number) {
          if (this.type[indexInput].type == 'password') {
              this.type[indexInput].type = 'text'
          } else {
              this.type[indexInput].type = 'password'

          }
        }

}
</script>

<style lang="css" scoped>
.enter-pa {
  padding: 0 15px;
  position: fixed;
  top: 0;
  right: 0;
  max-width: 625px;
  width: 100%;
  height: 100vh;
  z-index: 5;
  overflow-y: auto;
  -webkit-transform: translateX(625px);
  transform: translateX(625px);
  background-color: #fff;
  transition: all 0.5s linear;
}

.enter-pa.active {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.enter-block {
  margin: 0 auto;
  margin-top: 125px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
}

.enter-title {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  text-transform: uppercase;
  color: #282735;
}

.tab-block {
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
}

.tab {
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: #737373;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.tab::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  height: 2px;
  width: 0;
  background: #ffb83a;
  transition: all 0.2s ease;
}

.activeTab {
  color: black;
}

.activeTab::after {
  width: 100%;
}

.content-block {
  width: 100%;
}

.flex-block {
  margin-top: 47px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.forget-password {
  font-size: 16px;
  font-weight: 500;
  color: black;
  cursor: pointer;
  position: relative;
}

.forget-password::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: #3F3B98;
  transition: all 0.2s ease;
}

.forget-password:hover::after {
  width: 0;
}

@media all and (max-width: 330px) {
  .flex-block {
    flex-direction: column;
    align-items: flex-start;
  }

  .forget-password { margin-top: 15px; }
}

</style>