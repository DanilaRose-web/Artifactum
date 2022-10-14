<template>
   <textarea
    :type="type"
    :value="value"
    @click="onClick"
    @input="onInput($event.target.value)"
    :name="name"
    :id="name"
    :placeholder="placeholder"
    :class="showValidation?'error':'success'"
    :isShowPassword="isShowPassword"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";


@Component({name: 'pos-input'})
export default class PosTextarea extends Vue {
  @Prop({ type: String, required: true })
  value: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: false, default: undefined })
  name?: string;

  @Prop({ type: String, required: false, default: undefined })
  placeholder?: string;

  @Prop({ type: Boolean, default: false })
  password: boolean;

  @Prop({ type: Boolean, default: false })
  required: boolean;

  @Prop({ type: Boolean, default: false })
  currentType: boolean;

  @Prop({ type: Boolean, default: false })
  isShowPassword: boolean;

  innerValue: string;

  showValidation: boolean = false;

/**
 * Проверка валидности поля
 */
@Watch('value')
onChangeValue(){
  console.log("value",this.value);
  this.$emit('changeValue',this.value)
}
  isValid(): boolean {
    if (
      this.required &&
      (this.innerValue === undefined || this.innerValue === "" || this.isChecked)
    )
      return false;
    if (this.regex) return new RegExp(this.regex).test(this.innerValue + "");
    return true;
  }
/**
 * Проверка валидности поля + отображение невалидности      
 */
  checkValidation():boolean {
    if (this.isValid()) this.showValidation = false;
    else this.showValidation = true;
    return !this.showValidation;
  }

  onInput(newValue: string) {
    this.innerValue = newValue;
    
    this.$emit("input", this.innerValue);
    this.checkValidation();
  }

  onClick() {
    this.showValidation = false;
    var self = this
    self.checkValidation()
  }
}
</script>

<style scoped>
</style>