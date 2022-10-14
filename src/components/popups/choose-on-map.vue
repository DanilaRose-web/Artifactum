<template>    
    <div class="choose-on-map" v-if="!showChooseOnMap">
        <popup-title class="no-mb" :title="'Выбор точки на карте'" @on-click="$emit('on-click')">
            <close-popup @on-click="$emit('on-click')"/>
        </popup-title>

        <div id="map">
            <!-- <ui-maps
                @getCoord="getCoord"
                @dragend="getNewCoord"
                :zoom="14"
                :center="center"
                :keyMap="key"
                :theme="'silver'"
                :travelModeOption="'WALKING'"
                :markers="markers"
                >
                <template #infowindow="data"> 
                    <div>Hello</div>
                    <div>{{data.item.id}}</div>
                </template>
            </ui-maps> -->
            <ui-maps-leaflet
                ref="leaflet"
                :zoom="12"
                :markers="innerItems"
                :route="innerRoute"
                @markerClick="onMarkerClick"
                @dragend="onDragEnd"
                @getCoord="onGetCoord"
                @updateCoord="getUpdateCoord"
                :center="center">

                <template #infowindow="data">
                    {{ data }}
                </template>
            </ui-maps-leaflet>
        </div>
                
        <div class="modal-content">
            <div class="popup-content-wrap">
            </div>

            <div class="ui-submit-group-button justify-content-end">
                <ui-submit-button @click="$emit('addCoord', innerPointCor)">Выбрать</ui-submit-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'

    import ControlValidatorGroupComponent from "../components/control-validator-group.vue";
    import MarkerTemplate from "../ui-maps/markerTemplate";
    // import MarkerTemplate from ""
    import Position from "../ui-maps/position";
    import Route from "../ui-maps/route";
    import MarkerInfo from "../ui-maps/markerInfo";
    import {} from "googlemaps";
    import PointCoordinates from "../models/PointCoordinates"
    import PosMarkerData from "../leafletMap/posMarkerData"
    import MapPointItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem";
    import MapPointCoordinates from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointCoordinates";

    @Component
    export default  class ChooseOnMapComponent extends Vue {
        @Prop({ type: Boolean, default: false }) showChooseOnMap: boolean
        @Prop({ type: Object, default: null }) point: PointCoordinates;   

        innerCoordinate: PointCoordinates = null

        clickOnMap: boolean = false // при клике на карту блокирует появление второй точки, если точка уже была выбрана по клику
        center = [47.0264, 28.8404];
        innerItems: MarkerTemplate[] = [];
        innerRoute: number[][] = [];
        innerPointCor: Position = null
        innerPointCorUpdate: Position = null
        pointData:MapPointItem = null
        pointCoordStore: Position = null
        

        @Watch('innerItems') changePointCoord() {
          console.log(`this.innerItems`, this.innerItems);
        }

        @Watch('pointData.Coordinates') change() {
          console.log(`this.pointData.Coordinates`, this.pointData.Coordinates);
        }

        onDragEnd(data: { id: number; marker: MarkerTemplate }) {
            // console.log(`value onMarkerClick`, value);
        }
        onMarkerClick(pointInformation: any) {
            // console.log(`value onMarkerClick`, pointInformation);
            this.$emit('markerClick', pointInformation)
        }
        onGetCoord(pointCoord: Position) {
            this.innerPointCor = pointCoord
            this.innerItems = [{ id: 5, positionPoint: pointCoord,icon:"/assets/img/map-point.svg",draggable:true }];
            // this.innerPointCor = new MapPointCoordinates(this.innerPointCor.lat, this.innerPointCor.lng)
            
            this.$store.commit('addPointCoord', this.innerPointCor)
            // console.log(`this.innerPointCor`, this.innerPointCor);
            console.log(`this.pointData`, this.pointData);
        }

        getUpdateCoord(position: Position) {
          this.innerPointCorUpdate = position
          this.$store.commit('addPointCoord', this.innerPointCorUpdate)
          // console.log(this.innerPointCorUpdate, 'innerPointCorUpdate');
        }
        getItems() {
           this.innerItems = []
            this.innerItems = [
              {
                id: 5,
                icon: "/assets/img/map-point.svg",
                positionPoint: this.pointCoordStore,
                draggable: true
              }
            ];
            // this.innerRoute = [[47.0264, 28.8404], [47.0264, 29.8404]];
        }

        getStyle() {
            var style: any = {};

            style["height"] = 300 + "px";
        }

      


















        
        // добавление точки с координатами в массив
        getCoord(point: PointCoordinates) {
            if (!this.clickOnMap) {
                this.clickOnMap = true
                this.innerCoordinate = point
                this.markers.push({id: null, positionPoint: {lat: point.lat,lng:point.lng},typePoint: null,statusPoint: null,icon: '/assets/img/map-point.svg',draggable: true})
                // this.markers[this.markers.length-1].positionPoint = point;
                this.$emit('point', point)
            } else {
                return
            }
                
        }

        // Обновление координат точек при перетаскивании маркера
        getNewCoord(point: any) {
            const lat= point.marker.position.lat();
            const lng= point.marker.position.lng();
            const x: PointCoordinates = { lat:lat, lng:lng }
            console.log(`x=`, x);
            this.$emit('dragPoint', x)    
        }

        markers: MarkerTemplate[] = []

        created() {
            document.title = this.$route.meta.title;
            
            this.innerCoordinate = this.point
            // this.markers.push({id: 5, positionPoint: {lat: this.innerCoordinate.lat, lng: 29.6164383},typePoint: null,statusPoint: null,icon: '/assets/img/map-point.svg',draggable: false})
            // console.log(this.innerCoordinate);
        }

        mounted() {
          this.pointData = this.$store.getters.returnMapPoint
          this.pointCoordStore = new Position(this.pointData.Coordinates.Latitude, this.pointData.Coordinates.Longitude)
          this.$store.commit('addPointCoord', this.pointCoordStore)
          console.log(`this.pointCoordStore`, this.pointCoordStore);
          this.getItems();
        }

        updated() {
          
        }

        key: string = "AIzaSyAMpkjBIww4clA5qlRUpRtWlpU9GsRJbFQ";
        // center: Position = new Position(46.843103, 29.6164383);
        isLoading = false;
        // frontMapUrl = frontHostUrl + "/map";
        modalWindowShow = false
        countPoint: number[][] = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        styles: [	{
                    "featureType": "all",
                    "stylers": [
                        {
                            "saturation": 0
                        },
                        {
                            "hue": "#e7ecf0"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "stylers": [
                        {
                            "saturation": -70
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "saturation": -60
                        }
                    ]
                }]

    }
    
</script>

<style lang="less" scoped>

.choose-on-map {
    width: 100%;
}

.modal-content {
    padding: 0 24px 27px 24px;
    width: 100%;
}

.popup-content-wrap {
    margin-bottom: 22px;
    padding-bottom: 37px;
    border-bottom: 1px solid #CED4DE;
}

.ui-submit-group-button {
    display: flex;
    align-items: center;
}

@media all and (max-width: 380px) {
    .modal-content { padding: 0 15px 27px 15px; }
}





.page-map {
  position: relative;
  background-color: #fff;
  .ui-dropdown {
    .scroll {
      // height: 400px;
    }
  }
  .control-input {
    min-width: 100px;
    width: 100%;
  }
  .image-preview-modal .openimage {
    margin-right: 0;
  }
  .gray-line {
    border-bottom: 1px solid #f0f0f0;
  }
  .value {
    margin-left: auto;
    padding-left: 0.5rem;
  }
  .legenda {
    position: absolute;
    flex-direction: column;
    bottom: 50px;
    right: 30px;
    z-index: 1000;
    .l1 {
      background: rgba(255, 255, 255, 0.7);
    }
    .l2 {
      background: rgba(255, 255, 255, 0.7);
    }
  }

  .image {
    width: 200px;
    height: 200px;
    position: relative;
    img {
      width: 100%;
      // height: 100%;
    }
  }
  .mobile-user {
    .link {
      color: rgb(23, 145, 250);
    }
  }
  .infowindow {
    padding: 8px;
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
    .infowindow__img {
      img {
        width: 100%;
      }
    }
    &::-webkit-scrollbar {
      width: 4px;
      background: #ccc;
    }
    &::-webkit-scrollbar-thumb {
      border-width: 1px 1px 1px 2px;
      border-color: #777;
      background-color: #aaa;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-width: 1px 1px 1px 2px;
      border-color: #555;
      background-color: #777;
    }
    .img {
      img {
        width: 100%;
        // background: url() no-repeat;
        // background-size:cover ;
      }
    }
  }
  .btn {
    min-width: fit-content;
  }

  .file {
    position: relative;
    .btn-close {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.8);
      font-size: 24px;
      color: black;
      // align-items: center;
      // justify-content: center;
    }
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    color: black;
    align-items: center;
    justify-content: center;
  }
  .ui-table-header-item {
    font-weight: bold;
  }

  .btn-slim {
    height: 28px;
    margin-left: auto;
  }
  .ui-dropdown {
    width: 100%;
    .ui-box-menu {
      min-width: 160px;

      background-color: #fff;
      border-color: #ced4de;
    }
    .ui-list-view-item:hover {
      background: #f0f0f0;
    }
  }
  .ui-button {
    font-size: 14px;
  }
  input {
    display: none;
  }
  .ui-button {
    &.green {
      background-color: green;
    }
    &.blue {
      background-color: #1791fa;
    }
  }

  /* Анимации появления и исчезновения могут иметь */
  /* различные продолжительности и динамику.       */
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  // @media screen and (max-width: 1325px){
  //   .pb2{
  //     padding-top: 1rem;
  //   }
  // }
}
</style>