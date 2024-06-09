import Country from "./Country";

export default interface MilitaryCorps {
  id: string,
  name: string,
  branch: string,
  countryOrigin: Country,
  flag: string
}