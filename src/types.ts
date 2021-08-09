export interface Coorodinate {
  lat: number;
  lng: number;
}
export interface Task {
  /* Ideally each one of them will have its interface and I will combine them to one
     but in this case I don't see a need for it as I am using a very minimal data */
  address: { location: { coordinates: number[] }; formatted_address: string };
}
