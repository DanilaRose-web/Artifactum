<template>

    <div class="moderation-history" v-if="modHistory">
        <div class="moderation-item" :class="[{ routeStatus: 'approved',  }]" v-for="item in modHistory.Items" :key="item.Id">
            <div class="item-info">
                <div class="mode-icon"><img src="/assets/img/approved-route.svg" alt=""></div>
                <div class="mode-info">
                    <div class="mode-status">{{item.Status | routeStatus}}</div>
                    <div class="mode-date">
                        <img class="icon" src="/assets/img/calendar.svg" alt="">
                        <span>{{item.Date}}</span>
                    </div>
                </div>
            </div>
            <div class="item-comment">{{item.Description}}</div>
        </div>

        <div class="moderation-item reject">
            <div class="item-info">
                <div class="mode-icon reject"><img src="/assets/img/reject-route.svg" alt=""></div>
                <div class="mode-info">
                    <div class="mode-status">Отклонено</div>
                    <div class="mode-date">
                        <img class="icon" src="/assets/img/calendar.svg" alt="">
                        <span>20.05.2020</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="moderation-item verification">
            <div class="item-info">
                <div class="mode-icon "><img src="/assets/img/verification-route.svg" alt=""></div>
                <div class="mode-info">
                    <div class="mode-status">На модерации</div>
                    <div class="mode-date">
                        <img class="icon" src="/assets/img/calendar.svg" alt="">
                        <span>20.05.2020</span>
                    </div>
                </div>
            </div>
            <div class="item-comment">Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum</div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { Component, Prop, Watch } from "vue-property-decorator"
    import MapPointGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"
    import MapPointItem from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem"
    import ListViewItem from "list-view/src/listviewitem";
    import EqualMapPointItem from './../../../components/models/EqualMapPointItem'
    import MapPointsIdsRequest from "../../../components/models/MapPointsIdsRequest"
    import ModelCreateRouteRequest from "../../../components/models/ModelCreateRouteRequest"
    import MapPointShot from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapPointShot";
    import MapRoutePointRelationShot from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRoutePointRelationShot";
    import ModerationHistoryItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/ModerationHistoryItem";
    import GetModerationHistoryResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/GetModerationHistoryResponse";
    import EnumBizMapRouteStatus from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/EnumBizMapRouteStatus"


    @Component
    export default class ModerationHistoryComponent extends Vue {
        
        @Prop({ type: Number, default: null }) mapRouteId: number

        modHistory: GetModerationHistoryResponse = null
        innerMapRouteId: number = null
        routeStatus: EnumBizMapRouteStatus = null


        getRouteModerationHistory() {
            this.$api.MapRouteService.GetModerationHistoryEvent.once((response) => {
                this.modHistory = response.Value
            })
            this.$api.MapRouteService.GetModerationHistory({MapRouteId: this.innerMapRouteId})
        }

        created () {
            console.log(`this.routeStatus`, this.routeStatus);
            this.routeStatus
            if (this.modHistory) {
                this.modHistory.Items.forEach(item => {
                    item.Status 
                })
            }
            this.innerMapRouteId = this.mapRouteId
            this.getRouteModerationHistory()
        }
    }
</script>

<style lang="less">

.moderation-history {
    margin: 40px 0 30px 0;
}

.moderation-item {
    margin-bottom: 15px;
    background: white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}

.moderation-item.approved .mode-icon {
    background: #80DC90;
}

.moderation-item.verification .mode-icon {
    background: #FFB83A;
}

.moderation-item.reject .mode-icon {
    background: #F36F56;
}

.item-info {
    padding: 18px 15px;
    display: flex;
    align-items: flex-start;
    border-radius: 10px;
}

.mode-icon {
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
}

.mode-icon {
    width: 35px;
    height: 35px;
}

.mode-icon img {
    width: 15px;
    height: 15px;
}

.mode-status {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
}

.mode-date {
    display: flex;
    align-items: flex-start;
}

.mode-date span {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #9493A9;
}

.icon {
    margin-right: 7px;
    width: 10px;
    height: 10px;
}

.item-comment {
    padding: 12px 15px;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: black;
    border-top: 1px solid #DDDDDD;
}

</style>