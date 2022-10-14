<template>    
    <div class="group-button">
        <googleStore-button />
        <appStore-button />
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

.group-button {
    margin-top: 30px;
    display: flex;
    align-items: center;
}

@media all and (max-width: 1300px) {
    .group-button { 
        flex-direction: column;
        align-items: flex-start;
    }

    .btn--animate:first-child {
        margin-bottom: 10px;
    }
}

@media all and (max-width: 1000px) {
    .group-button { 
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .btn--animate:first-child {
        margin-bottom: 0;
    }
}

@media all and (max-width: 570px) {
    .group-button { 
        flex-direction: column;
        align-items: center;
    }

    .btn--animate:first-child {
        margin-bottom: 10px;
    }
}

</style>