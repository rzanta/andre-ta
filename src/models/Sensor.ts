import Manufacturer from './Manufacturer';

interface DPSensorResponse {
    id : string;
    name : string;
    category: string;
    manufacturer: string;
}

interface SensorCategory {
    id: string;
    name: string;
}

interface SensorDetail{
    id: string,
    name: string,
    category: SensorCategory,
    manufacturer: Manufacturer,
    maxSurfaceRange: number,
    maxSubSurfaceRange: number,
    maxAirRange: number,
    frequency: number,
    createdAt: string,
    updatedAt: string
}

interface SensorRequest {
    name: string;
    categoryId: string;
    manufacturerId: string;
    maxSurfaceRange: number,
    maxSubSurfaceRange: number,
    maxAirRange: number,
    frequency: number
}

export type {
    DPSensorResponse,
    SensorCategory,
    SensorDetail,
    SensorRequest
};
