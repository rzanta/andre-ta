
import Country from './Country';

export default interface Manufacturer {
    id: string;
    name: string;
    countryOrigin: Country;
}