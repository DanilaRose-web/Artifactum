<template>    
    <div class="table-body-col col">
        <div class="body-col-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableBodyColComponent extends Vue{

    }
    
</script>

<style lang="less" scoped>

.table-body-col {
    padding-left: 0.5px;
    padding-right: 0.5px;
    display: flex;
}

.body-col-content {
    padding-left: 20px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #F8F8F8;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #586174;
    min-height: 37px;
    width: 100%;
}

.no-padding .body-col-content {
    padding-right: 0;
    padding-left: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.no-padding.in-process .body-col-content {
    background: #FFB83A;
}

.no-padding.success .body-col-content {
    background: #5D58B7;
}

.table-body-col.no-padding-left .body-col-content {
    padding-left: 0;
    align-items: flex-start;
}

@media all and (max-width: 1666px) {
    .table-moderation {
        .body-col-content {
            padding-left: 10px;
        }
    }

    .table-moderation {
        .no-padding.success {
            .body-col-content {
                padding-left: 0px;
            }
        }
        .no-padding.in-process {
            .body-col-content {
                padding-left: 0px;
            }
        }
        .no-padding {
            .body-col-content {
                padding-left: 0px;
            }
        }
        
    }
}

</style>