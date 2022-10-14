<template>    
    <div class="user">
        <div class="user-photo"><img src="assets/img/user-photo.jpg" alt=""></div>
        <div class="user-name">ivanivanov</div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class UserFooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.user {
    display: flex;
    align-items: center;
}

.user-photo {
    width: 41px;
    height: 41px;
    border-radius: 50%;
    overflow: hidden;
}

.user-name {
    margin-left: 13px;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #343545;
}

@media all and (max-width: 460px) {
    .user-name { display: none; }
}

</style>