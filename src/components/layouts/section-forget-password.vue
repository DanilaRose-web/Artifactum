<template>
  <section class="section-forget-password">
    <close-icon />
    <div class="enter-block">
      <h3 class="enter-title">Восстановление пароля</h3>

        <div class="content-block">
            <div class="form">
                <pos-input-label
                    ref="email3"
                    label="Введите e-mail"
                    v-model="email3"
                    htmlClass=""
                    name="email3"
                    type="email"
                    placeholder="example@gmail.com"
                    :required="true"
                    :regex="email3Regex">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M1.15176 4.19213C1.30356 4.29925 1.76114 4.61738 2.52452 5.14638C3.28792 5.67538 3.87274 6.08269 4.27899 6.36834C4.32363 6.39966 4.41845 6.46772 4.56352 6.57263C4.70861 6.67762 4.82917 6.76245 4.9251 6.82716C5.0211 6.89185 5.13715 6.96442 5.27338 7.04475C5.40955 7.12501 5.53792 7.18539 5.65845 7.22535C5.77901 7.26565 5.89061 7.28561 5.99327 7.28561H6H6.00676C6.10942 7.28561 6.22106 7.26562 6.34162 7.22535C6.4621 7.18539 6.59059 7.12494 6.72665 7.04475C6.86278 6.96433 6.97883 6.89183 7.07483 6.82716C7.17083 6.76245 7.29129 6.67762 7.43643 6.57263C7.58148 6.46763 7.67642 6.39966 7.72105 6.36834C8.1317 6.08269 9.17644 5.35721 10.8549 4.19199C11.1808 3.96441 11.4531 3.6898 11.6718 3.36836C11.8907 3.04705 12 2.70998 12 2.35734C12 2.06266 11.8939 1.8104 11.6818 1.6006C11.4698 1.39075 11.2186 1.28589 10.9285 1.28589H1.07138C0.727657 1.28589 0.463135 1.40194 0.277867 1.63405C0.0926224 1.8662 0 2.15638 0 2.50457C0 2.78581 0.122808 3.09058 0.368308 3.41869C0.613784 3.74682 0.875022 4.00466 1.15176 4.19213Z" /><path d="M11.3303 4.90849C9.86614 5.89948 8.75439 6.66963 7.99557 7.2188C7.74111 7.40622 7.53468 7.55254 7.37615 7.65738C7.21762 7.76229 7.00679 7.86943 6.74335 7.97875C6.48 8.08824 6.23457 8.14282 6.00685 8.14282H6.00002H5.99329C5.76562 8.14282 5.52005 8.08824 5.2567 7.97875C4.99335 7.86943 4.78238 7.76229 4.62389 7.65738C4.46546 7.55254 4.25896 7.40622 4.00453 7.2188C3.40181 6.77687 2.29246 6.00666 0.676408 4.90849C0.421878 4.73896 0.196433 4.54464 0 4.32593V9.64274C0 9.93757 0.104866 10.1897 0.314714 10.3995C0.524516 10.6094 0.776794 10.7143 1.07145 10.7143H10.9286C11.2232 10.7143 11.4755 10.6094 11.6853 10.3995C11.8952 10.1896 12 9.93759 12 9.64274V4.32593C11.808 4.54012 11.5849 4.73444 11.3303 4.90849Z"  /></g><defs><clipPath id="clip0"><rect width="12" height="12" /></clipPath></defs></svg>
                </pos-input-label>

                <pos-input-label
                    ref="password3"
                    label="Введите пароль"
                    v-model="password3"
                    htmlClass=""
                    name="password3"
                    :type="type[0].type"
                    placeholder="*******"
                    :required="true"
                    :regex="password3Regex">
                    <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#password-key-input"></use></svg>
                <svg width="15" class="eye" v-if="type[0].type == 'password'" @click="currentType(0)" height="15" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-show"></use></svg>
                <svg width="15" class="hide" v-else @click="currentType(0)" height="13" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-hide"></use></svg>
                </pos-input-label>

                <div class="flex-block">
                    <form-button class="no-mt" @on-click="next3()">Восстановить</form-button>
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
        email3Regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        password3Regex: RegExp = /[\w\s\d]+$/;

        email3: string = "";
        password3: string = "";
        
              

        next3() {
            this.isClickedContinue = true;
            //если проходит валидация
            if ( !this.GetRef("email3").checkValidation() && !this.GetRef("password3").checkValidation()) {
            return;
            } else if ( !this.GetRef("email3").checkValidation() || !this.GetRef("password3").checkValidation()) {
            return;
            } 
        }

      // type: string = 'password'

      type: {
           name: string,
           type: string 
        } [] = [{name: 'password3', type: 'password'}];

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
.section-forget-password {
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

.section-forget-password.active {
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