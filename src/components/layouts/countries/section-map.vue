<template>    
    <section class="map">
        <div class="container-fluid map-container">
            <div id="map">
                <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.31554848066!2d-74.26054881416373!3d40.69714776531467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2z0J3RjNGOLdCZ0L7RgNC6LCDQodCo0JA!5e0!3m2!1sru!2s!4v1605868736907!5m2!1sru!2s" max-width="100%" width="100%" height="700" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> -->
                <ui-maps
                    :zoom="14"
                    :center="center"
                    :keyMap="key"
                    :theme="'silver'"
                    :travelModeOption="'WALKING'"
                    >
                </ui-maps>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    import ControlValidatorGroupComponent from "../components/control-validator-group.vue";
    import MarkerTemplate from "../ui-maps/markerTemplate";
    import Position from "../ui-maps/position";
    import Route from "../ui-maps/route";
    import MarkerInfo from "../ui-maps/markerInfo";
    import {} from "googlemaps";

    @Component
    export default  class FooterDefaultComponent extends Vue {
        

        key: string = "AIzaSyDX7Cc_IGqQsLRE57xfmGPlGBPDrOD-pd0";
        center: Position = new Position(47.0264, 28.8404);
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

        // mounted() {
        //     // When the window has finished loading create our google map below
        //     google.maps.event.addDomListener(window, 'load', init);
        
        //     function init() {
        //         // Basic options for a simple Google Map
        //         // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        //         var mapOptions = {
        //             // How zoomed in you want the map to start at (always required)
        //             zoom: 11,

        //             // The latitude and longitude to center the map (always required)
        //             center: new google.maps.LatLng(40.6700, -73.9400), // New York

        //             // How you would like to style the map. 
        //             // This is where you would paste any style found on Snazzy Maps.
                    // styles: [	{
                    //     "featureType": "all",
                    //     "stylers": [
                    //         {
                    //             "saturation": 0
                    //         },
                    //         {
                    //             "hue": "#e7ecf0"
                    //         }
                    //     ]
                    // },
                    // {
                    //     "featureType": "road",
                    //     "stylers": [
                    //         {
                    //             "saturation": -70
                    //         }
                    //     ]
                    // },
                    // {
                    //     "featureType": "transit",
                    //     "stylers": [
                    //         {
                    //             "visibility": "off"
                    //         }
                    //     ]
                    // },
                    // {
                    //     "featureType": "poi",
                    //     "stylers": [
                    //         {
                    //             "visibility": "off"
                    //         }
                    //     ]
                    // },
                    // {
                    //     "featureType": "water",
                    //     "stylers": [
                    //         {
                    //             "visibility": "simplified"
                    //         },
                    //         {
                    //             "saturation": -60
                    //         }
                    //     ]
                    // }]
                // };

        //         // Get the HTML DOM element that will contain your map 
        //         // We are using a div with id="map" seen below in the <body>
        //         var mapElement = document.getElementById('map');

        //         // Create the Google Map using our element and options defined above
        //         var map = new google.maps.Map(mapElement, mapOptions);

        //         // Let's also add a marker while we're at it
        //         var marker = new google.maps.Marker({
        //             position: new google.maps.LatLng(40.6700, -73.9400),
        //             map: map,
        //             title: 'Snazzy!'
        //         });
        //     }
        // }

    }
    
</script>

<style lang="css" scoped>

#map {
    max-width: 100%;
    width: 100%;
    height: 700px;
}

@media all and (max-width: 576px) {
    .map-container {
        padding-left: 0;
        padding-right: 0;
    }
}

</style>