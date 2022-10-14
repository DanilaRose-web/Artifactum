<template>
  <div class="uc-crop-window">
      <bs-container>
        <crop-image
          :image-src="image"
          :aspect-ratio=500/800
          :max-height=289
          :max-width=450
          :is-live-update="true"
          @update="update"
        ></crop-image>

        <bs-row :pt="4" justify-content-end :mx="0">
          <ui-button
            style="margin-right:5px"
            :width="100"
            active
            @onClick="onClickCancel"
          >Отменить</ui-button>
          <ui-button :width="100" @onClick="onClickOk">Ок</ui-button>
        </bs-row>
      </bs-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ImagePreviewModel from "crop-image/src/ImagePreviewModel";
import ImagePreviewSizeModel from "crop-image/src/ImagePreviewSizeModel";

@Component({
  name: "uc-crop-window"
})
export default class UcCropWindow extends Vue {
  @Prop({ default: "", type: String }) image!: string;
  // @Prop({required: true}) cropParams!: ImagePreviewModel;
  // @Prop({ default: 300, type: Number }) height: number;
  // @Prop({ default: 300, type: Number }) width: number;
  innerImagePreviewSize:ImagePreviewSizeModel
  click() {
    this.$emit("clickImage");
  }
  update(val:any){
    this.innerImagePreviewSize=val
  }
  onClickCancel(){
    this.$emit("clickCancel")
  }
  onClickOk(){
    this.$emit("clickOk",this.innerImagePreviewSize)
  }
}
</script>
<style lang="less">

</style>

