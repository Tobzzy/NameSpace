import React from "react";
import { GoogleMapDefault } from "./GoogleMapDefault";
import { Coorodinate } from "../types";
import TaskProvider from "../contexts/TaskProvider";

export const TaskMap = () => {
  const { tasks } = TaskProvider.useContainer();
  const coordinates: Coorodinate[] = tasks
    ? tasks.map(({ address }) => ({
        lat: address.location?.coordinates[1],
        lng: address.location?.coordinates[0],
      }))
    : [{ lat: 0, lng: 0 }];

  return (
    <GoogleMapDefault
      containerElement={<div style={{ height: `100vh`, width: "100%" }} />}
      mapElement={<div style={{ height: `100%` }} />}
      coordinates={coordinates}
      defaultCenter={{ lat: 59.437, lng: 24.7536 }}
    />
  );
};
