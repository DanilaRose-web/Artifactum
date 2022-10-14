<template>
  <div class="ui-tabs">
    <div class="header" :class="{gaphOn:gaphOn, right:right}" >
      <div
        class="header-item"
        :style="{'padding-left':titlePadding  + 'px','padding-right':titlePadding  + 'px' }"
        v-for="(i, index) in this.arr"
        :key="index"
        @click="onClickTab(i.title,index)"
        v-bind:class="{isActive: i.aciveLocal, isDisabled:i.isDisabled, gaphOn:gaphOn}"
        v-html="i.header()"
      >
        {{i.setTitle()}}
      </div>
    </div>
    <div :class="[fluid ? 'container-fluid' : 'container']">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import UITabItemComponent from "./ui-tab-item.vue";

@Component({
  name: "ui-tabs"
})
export default class UITabsComponent extends Vue {
  @Prop({ default: true, type: Boolean })       gaphOn!: Boolean;
  @Prop({ default: null, type: Boolean })         right: Boolean;
  @Prop({ default: 15,   type: Number })   titlePadding: Number;
  @Prop({ default: false })                       fluid: boolean;
  
  arr: any[] = [];

  get childTabs(): UITabItemComponent[] {
    return this.$children.filter(
      el => el instanceof UITabItemComponent
    ) as UITabItemComponent[];
  }

  mounted() {
    this.arr = this.childTabs;
  }
  onClickTab(value: any, index:number) {
    // this.arr.filter(x=>x.)
    if (this.arr[index].isDisabled) return;
    var i=0;
    this.arr.forEach(tab => {
        if (i==index) tab.setActive(true)
        else tab.setActive(false)
        i++;
    });
    this.$emit("click", value, index);
  }
}
</script>
<style lang="less" scoped>
@uiTabsHeaderBorderBottom: 2px #394e72 solid;
@uiTabsBgColor: #293b5a;
@uiTabsHeaderColor: #b8c3e0;
@uiTabsActiveColor: white;
@uiTabsActivegaphOnBorderBottom: 2px solid #4370ba;
@uiTabsDisableColor: gray;
.ui-tabs {
  display: block;
   background-color: @uiTabsBgColor;
  .header {
    display: flex;
  
    &.gaphOn {  border-bottom: @uiTabsHeaderBorderBottom; }
    &.right{
      justify-content: flex-end;
    }
  }
  .header-item {
    padding: 4px;
    cursor: pointer;    
    text-align: center;
    bottom: -2px;
    position: relative;
    color: @uiTabsHeaderColor;
    font-size: 15px;
  }
  .isActive {
    font-weight: bold;
    text-align: center;
    color: @uiTabsActiveColor;
    &.gaphOn {
      border-bottom: @uiTabsActivegaphOnBorderBottom;
    }

    
  }
  .isDisabled {
    color: @uiTabsDisableColor;
    cursor :not-allowed;
  }  
}
</style>