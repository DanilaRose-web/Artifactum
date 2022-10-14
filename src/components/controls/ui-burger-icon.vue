<template>    
    <div class="ui-burger-icon" :class="[burgerActive ? 'active' : '']" @click="addBurgerActive()">
        <span></span>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'
    import SidebarComponent from "../../layouts/sidebar.vue";
    @Component
    export default  class UiBurgerIconComponent extends Vue {
        burgerActive: boolean = true

        addBurgerActive() {
            this.burgerActive = !this.burgerActive;
            this.$emit('on-click');
        }
    }
    
</script>

<style lang="css" scoped>

.ui-burger-icon {
    margin-right: 27px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #38346F;
    border-radius: 50%;
    cursor: pointer;
}

span {
    width: 20px;
    height: 3px;
    background: #5D58B7;
    position: relative;
    border-radius: 50px;
}

span::after, span::before {
    content: '';
    width: 100%;
    height: 3px;
    background: #5D58B7;
    position: absolute;
    left: 0;
    border-radius: 50px;
}

span::before {
    top: -8px;
}

span::after {
    bottom: -8px;
}

.ui-burger-icon.active span, .ui-burger-icon.active span::after, .ui-burger-icon.active span::before {
    background: #FFB83A;
}

@media all and (min-width: 861px) {
    .ui-burger-icon { display: none; }
}

@media all and (max-width: 430px) {
    .ui-burger-icon { margin-right: 20px; }
}

</style>