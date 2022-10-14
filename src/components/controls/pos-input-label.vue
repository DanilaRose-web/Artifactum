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
        
        @Prop({type: String, required:true})
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

.form-item svg {
    position: absolute;
    left: 14px;
    top: 40px;
    fill: #5D58B7;
}

.form-item .eye, .form-item .hide, .form-item .eye2, .form-item .hide2, .form-item .eye3, .form-item .hide3, .form-item .eye4, .form-item .hide4, .form-item .eye5, .form-item .hide5 {
    position: absolute;
    right: 15px;
    left: inherit;
    top: 40px;
    fill: #9998AA;
    cursor: pointer;
}

.form-item .eye.none, .form-item .hide.none, .form-item .eye2.none, .form-item .hide2.none, .form-item .eye3.none, .form-item .hide3.none, .form-item .eye4.none, .form-item .hide4.none, .form-item .eye5.none, .form-item .hide5.none {
    display: none;
}

.form-item label {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #9493A9;
    display: inline-block;
}

.form-item input {
    padding-left: 36px;
    padding-right: 10px;
    min-height: 46px;
    width: 100%;
    background: #E7E6F9;
    border-radius: 5px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: black;
}

.form-item.error input {
    background: #FACDD4;
    color:  #B10444;
}

.form-item.error svg {
    fill: #B10444;
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


</style>