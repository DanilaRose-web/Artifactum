<template class="ui-usable-dropdown">
  <ui-dropdown :class="[ noBorder ? 'no-border' : '' ]" :items="dropdownItems" v-bind="$props" @changeAutocomlite="changeAutocomlite" :placeholder="placeholder">
  </ui-dropdown>
</template>

<script lang="ts">
import { Component, Model, Vue, Prop, Watch } from "vue-property-decorator";
import ListViewItem from "list-view/src/listviewitem";
import IEqual from "component-models/src/iequal";

//компонент "обертка" для удобного использования ui-dropdown
@Component({
  name: "ui-usable-dropdown"
})
export default class UiUsableDropdownComponent extends Vue {
  @Prop({ default: () => {[]}, type: Array}) items!: any[];
  @Prop({ default: 'id', type: String}) keyField: string; // передает id элемента option в ui-dropdown
  @Prop({ default: false, type: Boolean}) autocomplete: boolean; // производит поиск внутри dropdown
  @Prop({ default: false, type: Boolean}) scroll: boolean; // scroll внутри dropdown
  @Prop({ default: () => [] as string[]}) nameFields: string[]; // параметр, по которому items
  @Prop({ default: '', type: String}) placeholder: string;
  @Prop({ default: false, type: Boolean}) noBorder: boolean;

  @Model('onSelected', {type: [String, Number, Object, Array]}) value: any | string | number;
  dropdownItems: Array<ListViewItem<any>> = new Array<ListViewItem<any>>();
  @Watch('dropdownItems', { deep: true })
  onDropdownListChanged(value: ListViewItem<any> | ListViewItem<any>[]) {
    var result = Array.isArray(value)? 
     value.filter(x=>x.Selected).map(x=>this.getListViewValue(x)) : this.getListViewValue(value);
     if (JSON.stringify(this.items) == JSON.stringify(result)) {
       return;
     }
     this.$emit('onSelected', result.length > 1 ? result: result[0]);
  }
  getValue(value: any): any {
    // console.log('getValue', value[this.keyField]);
    if (!(value as Object).hasOwnProperty(this.keyField)) {
      console.warn(`Объект ${value} не имеет поля ${this.keyField}`);
    }
    return value[this.keyField];
  }
  getListViewValue(value: ListViewItem<any>): any {
    return value && value.Value ? this.getValue(value.Value) : null;
  }
  getString(value: ListViewItem<any>): any {
    let name = '';
    this.nameFields.forEach(nameField => {
      if (!(value as Object).hasOwnProperty(nameField)) {
        console.warn(`Объект ${value} не имеет поля ${nameField}`);
      } else {
        name = name + (value as any)[nameField] + ' '
      }
    });
    return name;
  }
  @Watch('items') 
  onItemsChanged()
  {
    this.initDdItems();
  }
  toListViewItem(item: any): ListViewItem<any> {
    (item as IEqual<any>).Equal = (object: any): boolean => {
        var res = this.getValue(item) == this.getValue(object);
        return res;
      }
    (item as IEqual<any>).EqualRelation = (object: any): boolean => this.getListViewValue(item) == this.getListViewValue(object);    
    (item as IEqual<any>).ToString = (): string => this.getString(item);
    const isSelected = this.value == this.getValue(item);
    const result = new ListViewItem<any>(item, isSelected, false);
    return result;
  }
  initDdItems() {
    this.dropdownItems = (this.items || []).map(x=>this.toListViewItem(x));
  }
  sourceListItem: Array<ListViewItem<any>> = [];

  created() {
    // console.log("create", this);
    
    this.initDdItems();
    this.sourceListItem = this.dropdownItems;

  }
  changeAutocomlite(search: string) {
    this.dropdownItems = this.sourceListItem.filter(item => (item.Value as any)[this.nameFields[0]].toLowerCase().indexOf(search.toLowerCase()) != -1);
  }
}
</script>

<style lang="less">



.ui-usable-dropdown {
  width: 100%;
}


</style>