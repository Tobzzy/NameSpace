import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  WithGoogleMapProps,
} from "react-google-maps";
import { Coorodinate } from "../types";
import { max, min } from "lodash";

interface Props extends WithGoogleMapProps {
  coordinates?: Coorodinate[];
  defaultCenter: any;
}

export const GoogleMapDefault = withGoogleMap(
  ({ coordinates, defaultCenter }: Props) => {
    const { maps } = (window as any).google;
    const getAllLat = coordinates && coordinates.map(({ lat }) => lat);
    const getAllLng = coordinates && coordinates.map(({ lng }) => lng);
    const bounds = new maps.LatLngBounds(
      new maps.LatLng(min(getAllLat), min(getAllLng)),
      new maps.LatLng(max(getAllLat), max(getAllLng))
    );

    return (
      <GoogleMap
        ref={(map) => map && map.fitBounds(bounds)}
        defaultCenter={defaultCenter}
        defaultZoom={5}
      >
        {coordinates &&
          coordinates.map(({ lat, lng }, index) => {
            return lat && lng && <Marker key={index} position={{ lat, lng }} />;
          })}
      </GoogleMap>
    );
  }
);
