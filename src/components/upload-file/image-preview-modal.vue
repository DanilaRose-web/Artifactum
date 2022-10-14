<template>
  <div class="image-preview-modal">
    <template v-if="!oneImage">
      <crop-image-preview
        id="crop_preview"
        ref="croppreview"
        :el-height="elHight"
        :image-src="imageUrlPreview"
        :crop-params="innervalue"
        :aspect-ratio="aspectRatio"
      ></crop-image-preview>
    </template>
    <div
      v-if="showError"
      class="error-msg"
      :class="{ hidden: !showError || !errorMessage }"
    >
      {{ errorMessage }}
    </div>

    <div class="ml-3 openimage">
      <ui-file-input
        ref="fileInput"
        :show-name="false"
        :placeholder="'Загрузить'"
        @onChange="onLoadFile"
      ></ui-file-input>
    </div>

    <div class="modal-windows">
      <modal-window
        title="Форматирование изображения"
        :visible="!!cropImageUrl"
        width="600px"
        @close="cropImageUrl = null"
      >
        <crop-image
          ref="crop"
          :image-src="cropImageUrl"
          :max-height="400"
          :max-width="450"
          :aspect-ratio="aspectRatio"
          @update="onCropUpdate"
        ></crop-image>
        <slot name="crop-modal"> </slot>
        <div
          slot="button"
          style="justify-content: flex-end; display: flex"
          class="mt-3 mb-3 ml-3"
        >
          <ui-button
            style="margin-right:5px"
            active
            :width="100"
            @onClick="clearFile"
            >{{ "Отмена" }}</ui-button
          >
          <ui-button :width="100" @onClick="saveCrop">{{
            "Сохранить"
          }}</ui-button>
        </div>
      </modal-window>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import CropImagePreviewComponent from "@components/cropImage/crop-image-preview.vue";
import ImagePreviewModel from "crop-image/src/ImagePreviewModel";
import UiFileInputComponent from "../upload-file/ui-file-input";

//import ImagePreview from "@models/imagePreview";

@Component({
  name: "image-preview-modal"
})
export default class ImagePreviewComponent extends Vue {
  @Prop({ type: Object, default: new ImagePreviewModel() })
  value: ImagePreviewModel;
  @Prop({ default: true }) noCache!: boolean;
  @Prop({ default: true }) showError!: boolean;
  @Prop({ default: true }) required!: boolean;
  @Prop({ default: 1 }) aspectRatio: number;
  @Prop({ default: 150 }) elHight: number;
  @Prop({ default: false, type: Boolean }) oneImage: boolean;
  cropImageUrl = "";
  file: File;
  cropFile: File;
  errorMessage: string = "";
  hasError: boolean = false;
  fileName=""
  innervalue: ImagePreviewModel = this.value;
  @Watch("innervalue")
  onInnerValueChanged() {
    this.$emit("input", this.innervalue,this.fileName);
  }
  @Watch("value")
  onValueChanged() {
    this.innervalue = this.value;
  }

  get imageUrlPreview(): string {
    return (
      this.innervalue.ImageUrl +
      (this.noCache ? `?no_cache=${new Date().getTime()}` : "")
    );
  }

  setPositions(data: any) {
    this.innervalue = new ImagePreviewModel();
    this.innervalue.Width = parseInt(data.width);
    this.innervalue.Height = parseInt(data.height);
    this.innervalue.Top = parseInt(data.top);
    this.innervalue.Left = parseInt(data.left);
  }
  onCropUpdate(data: ImagePreviewModel) {
    this.setPositions(data);
  }
  onLoadFile(file: File) {
    this.cropFile = file;
    var fileToLoad = file;
    var fileReader = new FileReader();
    this.fileName=file.name
  
    
    fileReader.onload = (fileLoadedEvent: any) => {
      var srcData = fileLoadedEvent.target.result;
      this.cropImageUrl = srcData;
    };
    fileReader.readAsDataURL(fileToLoad);
  }
  saveCrop() {
    this.file = this.cropFile;
    this.cropFile = null;
    (this.$refs.crop as any).forceUpdate();
    this.innervalue.ImageUrl = this.cropImageUrl;
    this.cropImageUrl = null;
    this.clearFile();
    this.isValid();
  }

  getSetParams() {
    return this.innervalue;
  }

  isValid(): boolean {
    this.errorMessage = "";
    if (
      this.required &&
      (!this.innervalue.ImageUrl ||
        this.innervalue.ImageUrl == "/assets/img/no_image.svg")
    ) {
      this.errorMessage = "*Выберите изображение";
      this.hasError = true;
      return false;
    }
    this.hasError = false;
    return true;
  }

  getFile() {
    return this.innervalue;
  }

  clearFile() {
    this.cropImageUrl = null;
    (this.$refs.fileInput as UiFileInputComponent).setFile(this.file);
  }
}
</script>

<style lang="less">
.image-preview-modal {
  #crop_preview {
    img.cr-image {
      // height: auto !important;
      background-color: rgb(240, 240, 240, 0.5) !important;
    }

    // max-height: 182px;
    border: 1px solid #e8e8e8;
  }
  .openimage {
    display: flex;
    justify-content: center;
    margin-right: 30px;
    margin-left: 0 !important;
    width: 100%;
    .ui-file-input {
      padding-top: 5px;
    }
    .nameimg {
      margin-left: 130px;
      margin-top: auto;
    }
  }
  .buttons {
    display: flex;
    margin-left: auto;
    #saveData {
      margin-right: 15px;
    }
  }
  .error-msg {
    color: #f13131;
    font-size: 14px;
    text-align: left;
    padding-top: 3px;
    .hidden {
      visibility: hidden;
    }
    .hid {
      display: none;
    }
  }
}
</style>
