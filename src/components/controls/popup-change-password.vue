<template>    
    <popup class="form-popup active" v-if="visible">
        <popup-title>Смена пароля</popup-title>
        <pos-input-label
            ref="password4"
            label="Введите новый пароль"
            v-model="password4"
            htmlClass="form-item"
            name="password4"
            :type="type[0].type"
            placeholder="*******"
            :required="true"
            :regex="password4Regex">
            <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#password-key-input"></use></svg>
            <svg width="15" class="eye" v-if="type[0].type == 'password'" @click="currentType(0)" height="15" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-show"></use></svg>
            <svg width="15" class="hide" v-else @click="currentType(0)" height="13" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-hide"></use></svg>
        </pos-input-label>

        <pos-input-label
            ref="password5"
            label="Повторите пароль"
            v-model="password5"
            htmlClass="form-item"
            name="password5"
            :type="type[1].type"
            placeholder="*******"
            :required="true"
            :regex="password5Regex">
            <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#password-key-input"></use></svg>
            <svg width="15" class="eye" v-if="type[1].type == 'password'" @click="currentType(1)" height="15" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-show"></use></svg>
            <svg width="15" class="hide" v-else @click="currentType(1)" height="13" ><use xlink:href="assets/img/svg-sprite.svg#password-eye-hide"></use></svg>
        </pos-input-label>

        <form-button @on-click="next4()">Сменить</form-button>
    </popup>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

        visible = true;
        
        isClickedContinue: boolean = false;
        password4Regex: RegExp = /[\w\s\d]+$/;
        password5Regex: RegExp = /[\w\s\d]+$/;

        type: {
           name: string,
           type: string 
        } [] = [{name: 'password4', type: 'password'}, {name: 'password5', type: 'password'}];
        
        

        password4: string = "";
        password5: string = "";

        mounted() {
            let input = document.querySelectorAll('input[type="password"]');
            console.log(input);
        }

        next4(value: string) {
            this.isClickedContinue = true;
            //если проходит валидация
            if ( !this.GetRef("password4").checkValidation() && !this.GetRef("password5").checkValidation()) {
                return;
            } else if ( !this.GetRef("password5").checkValidation() || !this.GetRef("password5").checkValidation()) {
                return;
            } 
            
        }

        currentType(indexInput: number) {
            // var eye = document.querySelectorAll('.eye4')
            // var hide = document.querySelectorAll('.hide4')

            if (this.type[indexInput].type == 'password') {
                this.type[indexInput].type = 'text'
                // console.log(this.type);
                
                // for (let i = 0; i < eye.length; i++) {
                //     eye[i].classList.add('none')
                // }
                // for (let i = 0; i < hide.length; i++) {
                //     hide[i].classList.remove('none')
                // }
                
                

            } else {
                this.type[indexInput].type = 'password'
                // for (let i = 0; i < eye.length; i++) {
                //     eye[i].classList.remove('none')
                // }
                // for (let i = 0; i < hide.length; i++) {
                //     hide[i].classList.add('none')
                // }
                
            }
        }

        currentType2() {
            // var eye2 = document.querySelectorAll('.eye2')
            // var hide2 = document.querySelectorAll('.hide2')

            if (this.type[1].type == 'password') {
                this.type[1].type = 'text'
                // for (let i = 0; i < eye2.length; i++) {
                //     eye2[i].classList.add('none')
                // }
                // for (let i = 0; i < hide2.length; i++) {
                //     hide2[i].classList.remove('none')
                // }
            } else {
                this.type[1].type = 'password'
                // for (let i = 0; i < eye2.length; i++) {
                //     eye2[i].classList.remove('none')
                // }
                // for (let i = 0; i < hide2.length; i++) {
                //     hide2[i].classList.add('none')
                // }
            }
        }
      }
    
    
</script>

<style lang="css" scoped>


</style>