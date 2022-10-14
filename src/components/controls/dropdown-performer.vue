<template>
  <div class="monitoring-filter-performer">
    <ui-dropdown
      ref="dropdown"
      :items="innerItems"
      style="cursor:pointer"
      @change="onChange"
      @clickOutSide="clickOutSide"
    >
      <template
        #singleselect="data"
        :SelectItems="data.getSelectItems()"
      >
        <div class="my-class width100">
          <div class="ui-select" style="align-items: center; ">
            <div class="cut d-flex">
              <div v-if="getName() != 'Все исполнители'" class="foto col-auto mr-2" :style="getImageSelected()"></div>
              <div class="name on-selected">{{ getName() }}</div>
            </div>
            <div class="icon1 icon-ic_down"></div>
          </div>
        </div>
      </template>
      <template  #singleselectactive="data">
        <div class="my-class width100">
          <div class="ui-select" style="align-items: center; ">
            <div class="cut d-flex">
              <div v-if="getName() != 'Все исполнители'" class="foto col-auto mr-2" :style="getImageSelected()"></div>
              <div class="name on-selected">{{ getName() }}</div>
            </div>
            <div class="icon1 icon-ic_down"></div>
          </div>
        </div>
      </template>
      <template #options="data">
        <ui-box-menu  :shadow="shadow" class="width100">
          <ui-input v-model="autoCompletePerformer" noBorder :autofocus="true" :showError="false" @customInput="onInputAutocomplete" @onEnter="onEnterAutocomplete"></ui-input>
          <ui-scroll ref="scroll" class="scroll">
          <ui-list-view :items="data.Items" underline @select="data.select">
            <template #default="data">
              <div class="performer-item">
                <div class="foto col-auto mr-2" v-if="data.item.Value.id != 0" :style="getImage(data.item.Value.avatar)"></div>
                <div class="name on-selected" :title="data.item.Value.name">{{ data.item.Value.name }}</div>
              </div>
            </template>
            <template #selected="data">
              <div class="performer-item">
                <div class="foto col-auto mr-2" v-if="data.item.Value.id != 0" :style="getImage(data.item.Value.avatar)"></div>
                <div class="name on-selected" :title="data.item.Value.name">{{ data.item.Value.name }}</div>
              </div>
            </template>
            <template #hover="data">
              <div class="performer-item">
                <div class="foto col-auto mr-2" v-if="data.item.Value.id != 0"  :style="getImage(data.item.Value.avatar)"></div>
                <div class="name on-selected" :title="data.item.Value.name">{{ data.item.Value.name }}</div>
              </div>
            </template>
          </ui-list-view>
          </ui-scroll>
        </ui-box-menu>
      </template>
    </ui-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ListViewItem from "list-view/src/listviewitem";
import Employee from "../../../../employees/Employee";
import UiDropdownComponent from "ui-dropdown/src/ui-dropdown.vue";



@Component({
  name: "dropdown-performer"
})
export default class UcTaskDropdownFilterPerformer extends Vue {
  @Prop({ default: false, type: Boolean }) shadow: boolean;
  @Prop({ type: Number, default: 0 }) value: Number;
  @Prop({ default: [] }) items: Array<ListViewItem<Employee>>;
  innerItems: Array<ListViewItem<Employee>> = new Array<ListViewItem<Employee>>();
  autoCompletePerformer: string = '';
  selectedPerformer: ListViewItem<Employee> = null;
  @Watch("value")
  onChangeItems() {
    this.refresh();
  }
  @Watch("items")
  onChangeItemsList() {
    this.refresh();
  }
  created() {
    this.refresh();
  }
  refresh() {
    var x = this.items.map(x => ({ ...x }));
    x.forEach(x => (x.Selected = (x.Value as Employee).id == this.value));
    this.innerItems = x;
    this.selectedPerformer = this.innerItems.find(item => item.Selected == true);
    if (this.innerItems.length > 0) {
      if (this.innerItems.filter(x => (x.Value as Employee).id == this.value).length == 0) {
        this.innerItems[0].Selected = true;
        this.selectedPerformer = this.innerItems[0]; 
        this.$emit("change", (this.innerItems[0].Value as Employee).id);
      }
    }
  }
  onInputAutocomplete(search: string) {
    const items = this.items.filter(item => {
      return  (item.Value as Employee).name.toLowerCase().trim().indexOf(search.toLowerCase().trim()) != -1;
    });
    this.innerItems = items;
    if (this.innerItems.length * 53 > 212) {
      ((this.$refs.scroll as Vue).$el as HTMLElement).style.height = '212px';
    } else {
       ((this.$refs.scroll as Vue).$el as HTMLElement).style.height = `${this.innerItems.length * 53}px`;
    }
  }
  onEnterAutocomplete() {
    this.innerItems = this.innerItems.map((item, id) => {
      if (id == 0) {
        item.Selected = true;
        this.selectedPerformer = item;
      } else {
        item.Selected = false;
      }
      return item;
    });
    (this.$refs.dropdown as UiDropdownComponent).ShowItemsList = false;
    this.autoCompletePerformer = '';
    this.innerItems = this.items.map(el => {
      if ((el.Value as Employee).id == (this.selectedPerformer.Value as Employee).id) {
        el.Selected = true;
      } else {
        el.Selected = false;
      }
      return el
    });
    this.$emit("change", (this.selectedPerformer.Value as Employee).id);
  }
  onChange(value: any) {
    this.$emit("change", value[0].Value.id);
    this.autoCompletePerformer = '';
  }
  clickOutSide() {
    this.autoCompletePerformer = '';
    this.innerItems = this.items.map(el => {
      if ((el.Value as Employee).id == (this.selectedPerformer.Value as Employee).id) {
        el.Selected = true;
      } else {
        el.Selected = false;
      }
      return el
    })
  }
  getName(index: number): string {
    if (this.innerItems.length == 0) {
      return "";
    }
    if (!!this.selectedPerformer) {
      return (this.selectedPerformer.Value as Employee).name;
    }
  }
  getImageSelected() {
    if (this.innerItems.length == 0) return "";
    let urlSelectedEmployee = (this.selectedPerformer.Value as Employee).avatar;
    return this.getImage(urlSelectedEmployee);
  }
  getImage(url: string) {
    return {
      backgroundImage: `url(${url})`
    };
  }
}
</script>
<style lang="less" scoped>
.monitoring-filter-performer {
  .scroll {
    height: 212px;
  }
  .ui-select {
    height: 43px;
  }
  .margin-left {
    margin-left: -10px;
  }
  .width100{
    width: 100%;
  }
  .name {
    margin: auto 0;
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
  } 
  .performer-item {
    height: 42px;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .foto {
    border-radius: 50%;
    width: 2.15rem;
    height: 2.15rem;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
}
</style>

