<template>
    <header>
        <div class="container-fluid header-container">
          <div class="flex-block">
            <ui-burger-icon @on-click="$emit('on-show-menu')" />
            <logo />
          </div>
        <div class="flex-block">
          <div class="notifications" :class="[notifications ? 'active' : '']" @click="allow()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M18.2739 16.8692L16.8431 14.4842C16.1823 13.3834 15.8331 12.1225 15.8331 10.8392V8.75C15.8331 6.1125 14.0731 3.88168 11.6664 3.1625V1.66668C11.6664 0.7475 10.9189 0 9.99972 0C9.08054 0 8.33304 0.7475 8.33304 1.66668V3.1625C5.9264 3.88168 4.1664 6.1125 4.1664 8.75V10.8392C4.1664 12.1225 3.81722 13.3825 3.15722 14.4834L1.7264 16.8684C1.6489 16.9975 1.64722 17.1575 1.7214 17.2884C1.79558 17.4192 1.93308 17.5 2.08308 17.5H17.9164C18.0664 17.5 18.2047 17.4192 18.2789 17.2892C18.3531 17.1592 18.3506 16.9975 18.2739 16.8692Z" /><path d="M7.37555 18.3333C7.84555 19.315 8.84055 20 9.99969 20C11.1588 20 12.1539 19.315 12.6239 18.3333H7.37555Z" /></g><defs><clipPath id="clip0"><rect width="20" height="20" /></clipPath></defs></svg>
          </div>

          <div class="user" @click="$emit('on-click')" v-if="userInfo">
            <div class="user-photo"><img :src="userInfo.PhotoUrl" alt=""></div>
            <div class="user-info">
              <div class="user-name">{{userInfo.NickName}}</div>
              <div class="user-balance" v-if="goldBalance">
                <div class="quantity">{{goldBalance.GoldBalance}}</div>
                <div class="icon"><img src="assets/img/coins.svg" alt=""></div>
              </div>
            </div>
            <user-menu :showUserMenu="!showUserMenu"/>
          </div>
        </div>
    </div>
  </header>
</template>

<script lang="ts">
  import GetGoldBalanceResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Profiles/GetGoldBalanceResponse";
  import GetProfileResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Profiles/GetProfileResponse";
  import Vue from "vue";
  import { Component, Prop } from "vue-property-decorator";
  import LoginResponse from "../../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Users/LoginResponse"


  @Component
  export default class HeaderMainComponent extends Vue {
    @Prop({ type: Boolean, default: false })
    showUserMenu: boolean

    notifications: boolean = false
    showBurgerActive: boolean = false
    userInfo: GetProfileResponse = null
    goldBalance: GetGoldBalanceResponse = null
    
    created() {
      // console.log(this.userInfo, 'user');
      console.log("created header");
      
      this.getUserInfo()
      this.getGoldBalance()
    }
    allow() {
      this.notifications = !this.notifications
    }

    async getUserInfo() {
        let req = await this.$api.AccountService.getProfileAsync()
        if (req) {
          this.userInfo = req
          console.log(this.userInfo, 'user');
        }
    }

    async login() {
      let req = await this.$api.AccountService.loginAsync({Email: this.userInfo.Email, Password: ''})
      // console.log('fjdkffffffffffffffffffffffffffffffffffffffff');
      
      if (!req.IsEmailActive) {
        this.$router.push({ name: '/' })
      }
    }

    async getGoldBalance() {
      let req = await this.$api.AccountService.getGoldBalanceAsync()
      if (req) {
        this.goldBalance = req
        
      }
    }
    
  }
</script>

<style lang="css" scoped>

header {
  background: #282556;
  border-bottom: 1px solid #FFB83A;
}

.header-container {
  padding: 0 0 0 33px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-block {
  display: flex;
  align-items: center;
}

.notifications {
  width: 41px;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #38346F;
  border-radius: 50%;
  cursor: pointer;
}

.notifications svg {
  fill: #5D58B7;
}

.notifications.active svg {
  fill: #FFB83A;
}

.user {
  margin-left: 27px;
  padding-right: 33px;
  padding-left: 27px;
  display: flex;
  align-items: center;
  min-height: 73px;
  border-left: 1px solid #403D6A;
  cursor: pointer;
  position: relative;
}

.user-photo {
  margin-bottom: 5px;
  width: 41px;
  height: 41px;
  border-radius: 50%;
  overflow: hidden;
}

.user-photo img {
  max-width: 100%;
  height: auto;
  width: 41px;
  height: 41px;
}

.user-name, .quantity {
  margin-left: 13px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #FFB83A;
}

.user-balance {
  display: flex;
  /* align-items: center; */
}

.quantity {
  margin-right: 7px;
}

.icon {
  width: 16px;
}

@media all and (max-width: 555px) {
  .header-container { padding: 0 0 0 20px; }
  .user { margin-left: 20px; padding-left: 20px; padding-right: 20px; }
  .user-name { display: none; }
}

</style>