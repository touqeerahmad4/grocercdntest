import React from "react";
import { GOOGLE_MAP_URL } from "../constatns/AppConstants";
import { _get } from "../utils/HelperUtils";
import withCustomStyles from "./MapWithASearchBoxPart.style";
import { getCoordinate } from "../utils/MapUtils";
import {
  isEasyPaisaMiniApp,
  logInfoMessage,
  logMessage
} from "../utils/AppUtils";
import LoadMorePart from "./LoadMorePart";

const { compose, withProps, lifecycle } = require("recompose");
const { withGoogleMap } = require("react-google-maps/lib/withGoogleMap");
const { withScriptjs } = require("react-google-maps/lib/withScriptjs");
const { Marker } = require("react-google-maps/lib/components/Marker");
const { GoogleMap } = require("react-google-maps/lib/components/GoogleMap");
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

const defaultMapOptions = {
  clickableIcons: false,
  keyboardShortcuts: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false
};

export const MapWithASearchBoxPart = compose(
  withProps({
    googleMapURL: GOOGLE_MAP_URL,
    loadingElement: <LoadMorePart />,
    containerElement: (
      <div
        style={{
          height: "50vh",
          marginBottom: "16px"
        }}
      />
    ),
    mapElement: <div style={{ height: "100%" }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      if (!isEasyPaisaMiniApp()) {
        window.navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (lat && lng) {
            this.setState({
              ...this.state,
              center: {
                lat,
                lng
              },
              markerCenter: {
                lat,
                lng
              }
            });
          }
        });
      }

      const initialCenter = {
        lat: 31.5204,
        lng: 74.3587
      };
      this.setState({
        bounds: null,
        center: initialCenter,
        markerCenter: initialCenter,
        markers: [],
        isMapMounted: false,
        handleEasyPaisaLocation: data => {
          logInfoMessage("Location data in map", {
            environment: "easypaisa_miniapp",
            data
          });
          if (data && data.status === "SUCCESS") {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            if (lat && lng) {
              this.setState({
                ...this.state,
                center: {
                  lat,
                  lng
                },
                markerCenter: {
                  lat,
                  lng
                }
              });
            }
          } else if (data.latitude && data.longitude) {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            if (lat && lng) {
              this.setState({
                ...this.state,
                center: {
                  lat,
                  lng
                },
                markerCenter: {
                  lat,
                  lng
                }
              });
            }
          }
        },
        onMapMounted: ref => {
          refs.map = ref;
          this.setState({
            isMapMounted: true
          });
        },
        onIdle: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
            markerCenter: refs.map.getCenter()
          });
        },
        onDrag: () => {
          this.setState({
            markerCenter: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _get(nextMarkers, "0.position", this.state.center);

          this.setState({
            center: nextCenter,
            markerCenter: nextCenter,
            markers: nextMarkers
          });
        },
        locationChange: () => {
          const state = this.state;
          const props = this.props;
          const lat = getCoordinate(state.center, "lat");
          const lng = getCoordinate(state.center, "lng");
          const markerLat = getCoordinate(state.markerCenter, "lat");
          const markerLng = getCoordinate(state.markerCenter, "lng");

          if (
            lat === markerLat &&
            lng === markerLng &&
            window.google &&
            window.google.maps
          ) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: state.center }, function(
              results,
              status
            ) {
              if (status === "OK") {
                props.onLocationUpdate(
                  lat,
                  lng,
                  _get(results, "0.formatted_address")
                );
              } else {
                logMessage("Geocoder failed due to: " + status);
              }
            });
          }
        }
      });
    },
    componentDidMount() {
      this.props.setLocationUpdate(this.state.locationChange);
      // For easypaisa location update
      if (isEasyPaisaMiniApp()) {
        this.state.handleEasyPaisaLocation(this.props.epLocation);
      }
    }
  }),
  withScriptjs,
  withGoogleMap,
  withCustomStyles
)(props => {
  const classes = props.classes;

  return (
    <React.Fragment>
      {!props.isMapMounted && <LoadMorePart />}
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        className={classes.displayNone}
        defaultOptions={defaultMapOptions}
        center={props.center}
        onDrag={props.onDrag}
        onIdle={props.onIdle}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={window.google.maps.ControlPosition.LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search localities e.g. DHA"
            className={classes.input}
          />
        </SearchBox>
        <Marker position={props.markerCenter} defaultAnimation={2} />
      </GoogleMap>
    </React.Fragment>
  );
});
