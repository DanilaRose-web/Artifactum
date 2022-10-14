<template>
  <div class="ui-tab-item" v-if="aciveLocal">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "ui-tab-item"
})
export default class UITabItemComponent extends Vue {
  @Prop({ default: null, type: String })                  title!: String;
  @Prop({ default: false, type: Boolean })           isDisabled!: boolean;
  @Prop({ default: "" })                                 prefix!: "";
  @Prop({ default: "" })                                 suffix!: "";
  @Prop({ default: false, type: Boolean })               active!: boolean;

aciveLocal: boolean = this.active;

  setActive(value: boolean) {
    this.aciveLocal = value;
  }

  setTitle() {
    return this.title;
  }
  header() {
    var title = this.title == null ? "" : this.title;
    return this.prefix +  title + this.suffix;
  }
}
</script>
<style lang="css" scoped>

.ui-tab-item {
   font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: #737373;
    position: relative;
    transition: all 0.2s ease;
}

.ui-tab-item::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    width: 0;
    background: #FFB83A;
    transition: all 0.2s ease;
}


</style>