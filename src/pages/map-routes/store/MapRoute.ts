import ModelMapRoutesEdit from "../models/ModelMapRouteEdit";
import Vue from "vue";
import Vuex from "vuex";
import ModelCreateRouteRequest from "@components/models/ModelCreateRouteRequest";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {   // хранилище
        route: null,
        routeCreate: null,
        mapPoint: null,
        pointCoord: null
    },


    mutations: {
        addRoute(state, route) {
            state.route = route
            console.log(`route`, route);
        },
        addRouteCreate(state, routeCreate: ModelCreateRouteRequest) {
            state.routeCreate = routeCreate
            // console.log(routeCreate, 'routeCreate');
        },
        addPoint(state, mapPoint) {
            state.mapPoint = mapPoint
            // console.log(`mapPoint`, mapPoint);
        },
        addPointCoord(state, pointCoord) {
            state.pointCoord = pointCoord
            console.log(`pointCoord Хранилище`, pointCoord);
        }
    },

    getters: {
        returnRoute(state) {
            return state.route;  
        },
        returnRouteCreate(state) {
            return state.routeCreate;
        },
        returnMapPoint(state) {
            return state.mapPoint;
        },
        returnPointCoord(state) {
            return state.pointCoord
        }

    }
}) 

export default store