<template>    
    <div class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 advantages-col">
        <div class="advantages-item">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.advantages-col {
    padding-bottom: 67px;
    display: flex;
    justify-content: center;
}

.advantages-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.advantages-item__icon {
    margin-bottom: 15px;
    max-width: 36px;
    width: 100%;
}

.advantages-item__icon img {
    max-width: 100%;
    height: auto;
}

.advantages-item__quantity, .advantages-item__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 47px;
    text-align: center;
    color: #FFFFFF;
}

.advantages-item__title {
    font-size: 18px;
    line-height: 13px;
}

@media all and (max-width: 400px) {
    .advantages-col {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

</style>