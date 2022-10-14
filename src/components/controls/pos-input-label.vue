<template>    
    <div class="form-item" v-bind:class="[{ 'error': showValidation}, htmlClass]">        
        <label :for="name" v-if="label">{{label}}</label>
        <slot />
        <pos-input
            :type="type"
            :ref="'input'+name" 
            :value="value" 
            @input="onInput" 
            @changeValue="onChangeValue"
            :name="name" 
            :placeholder="placeholder"  
            :required="required"
            :regex="regex" 
            :password="password"
            :isShowPassword="isShowPassword"
        />
        <slot />
    </div>
</template>

<script lang="ts">
/* Получение значения из input ======================

:value="value" - запоминаем значение в value

@Watch('value') - отслеживае изменения в input
onChangeValue(){
  console.log("value",this.value); - выводим значение input в консоль
  this.$emit('changeValue',this.value) - $emit работает как всплытие событий, его могут увидеть родительские элементы. Например: 
  
  pos-input - мой input - генерирует $emit, его родитель pos-input-label (form-item) теперь может уидеть значение value, 
  pos-input-label - на странице activation-code - теперь тоже увидит value
}

================================================ */
    import Vue from 'vue'
    import { Component, Prop, Watch } from 'vue-property-decorator';
    
    

    @Component
    export default class PosInputLabel extends Vue {
        
        @Prop({type: String, required: true})
        value: string

        @Prop({type: String, required:true})
        type: string

        @Prop({type: String, required:false, default: undefined })
        name?: string

        @Prop({type: String, required:false, default: undefined})
        placeholder?: string

        @Prop({type: RegExp, required:false, default: undefined})
        regex?: RegExp

        @Prop({type: Boolean, default: false})
        password: boolean

        @Prop({type: Boolean, default: false })
        required: boolean

        @Prop({type: String, default: undefined })
        htmlClass?: string

        @Prop({type: String, default: undefined })
        label?: string

        @Prop({type: Boolean, default: undefined })
        isShowPassword?: boolean

        innerValue: string;

        created(){
            this.innerValue = this.value;
        }

        
        onChangeValue(value:string){
            console.log('pos-input-label',value);
            this.$emit('changeValue',this.value)
        }

        
        /**
         * Проверка валидности поля + отображение невалидности
         */
        checkValidation():boolean {
            if (this.GetRef('input'+this.name).checkValidation()) this.showValidation = false;
            else this.showValidation = true;
            return !this.showValidation;
        }
        /**
         * Проверка валидности поля
         */
        isValid():boolean {
            var res = this.GetRef('input'+this.name).isValid();
            return res;
        }
        showValidation: boolean = false;

        onInput(newValue:string){
            this.innerValue = newValue;
            this.$emit('input', this.innerValue);
            this.checkValidation()
        }

    }
</script>

<style lang="css" scoped>

.form-item {
    margin-bottom: 17px;
    position: relative;
    width: 100%;
}

.signin-form-item {
    margin-bottom: 22px;
}

.form-item svg {
    position: absolute;
    left: 14px;
    top: 11px;
    fill: #5D58B7;
}

.form-item .eye {
    position: absolute;
    right: 15px;
    left: inherit;
    top: 40px;
    fill: #9998AA;
    cursor: pointer;
}

.form-item label {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
    display: inline-block;
}



.form-item input {
    font-family: 'Proxima Nova', sans-serif;
    padding-left: 15px;
    padding-right: 10px;
    min-height: 35px;
    width: 100%;
    background: white;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #162147;
    border: 1px solid #CED4DE;
}

.signin-form-item input {
    padding-left: 40px;
}

.form-item.error input {
    background: #FACDD4;
    color:  #B10444;
    border: 1px solid #B10444;
}

.form-item.error label {
    color: #B10444;
}

.form-item.error svg {
    fill: #B10444;
}

.form-item ::-webkit-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162147;
    opacity: 1; /* Firefox */
}

.form-item :-moz-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162147;
    opacity: 1; /* Firefox */
}

.form-item ::-moz-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162147;
    opacity: 1; /* Firefox */
}

.form-item :-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162147;
    opacity: 1; /* Firefox */
}

.form-item ::-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162147;
    opacity: 1; /* Firefox */
}

.form-item ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162147;
    opacity: 1; /* Firefox */
}
  
.form-item :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #162147;
}
  
.form-item ::-ms-input-placeholder { /* Microsoft Edge */
    color: #162147;
}




.signin-form-item ::-webkit-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6C707A;
    opacity: 1; /* Firefox */
}

.signin-form-item :-moz-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6C707A;
    opacity: 1; /* Firefox */
}

.signin-form-item ::-moz-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6C707A;
    opacity: 1; /* Firefox */
}

.signin-form-item :-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6C707A;
    opacity: 1; /* Firefox */
}

.signin-form-item ::-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6C707A;
    opacity: 1; /* Firefox */
}

.signin-form-item ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #6C707A;
    opacity: 1; /* Firefox */
}
  
.signin-form-item :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #6C707A;
}
  
.signin-form-item ::-ms-input-placeholder { /* Microsoft Edge */
    color: #6C707A;
}







.form-item.error ::-webkit-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #B10444;
    opacity: 1; /* Firefox */
}

.form-item.error :-moz-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #B10444;
    opacity: 1; /* Firefox */
}

.form-item.error ::-moz-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #B10444;
    opacity: 1; /* Firefox */
}

.form-item.error :-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #B10444;
    opacity: 1; /* Firefox */
}

.form-item.error ::-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #B10444;
    opacity: 1; /* Firefox */
}

.form-item.error ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #B10444;
    opacity: 1; /* Firefox */
}
  
.form-item.error :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #B10444;
}
  
.form-item.error ::-ms-input-placeholder { /* Microsoft Edge */
    color: #B10444;
}

.popup-input {
    margin-bottom: 0;
}

.popup-input.hide {
    display: none;
}

.popup-input input {
    border: none;
    background: #D7DEE9;
}




</style>