<template>    
    <div class="popup-title">
        <div class="popup-title-container">
            <h3 v-if="title">{{ title }}</h3>

            <div class="flex-block">
                <slot />
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'

    @Component
    export default  class PopupTitleComponent extends Vue {
        @Prop({ type: String, default: '' })
        title: string
    }
    
</script>

<style lang="css" scoped>

.popup-title {
    margin-bottom: 23px;
    padding: 13px 0;
    background: #E7E7F2;
    width: 100%;
}

.no-mb {
    margin-bottom: 0;
}

.popup-title-container {
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h3 {
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: #162147;
}

.flex-block {
    display: flex;
    align-items: center;
}

</style>