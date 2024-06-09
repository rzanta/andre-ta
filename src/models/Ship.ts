
interface DPShipResponse {
  id: string,
  class: string,
  hullNumber: string,
  name: string,
  country: string,
}

interface ShipGeneralForm{
  class: string,
  hullNumber: string,
  name: string,
  environment: string,
  shipGeneralTypeId: string,
  shipCategoryId: string,
  warfareCapabilitiesIds: string[],
  lethalityLevel: string,
  manufacturerId: string,
  ownerId: string,
  hullDesign: string,
  commissionedYear: number,
  sailing: string,
  crew: number,
}

interface ShipSpecificationForm {
  cruisingSpeed: number,
  maxSpeed: number,
  combatRange: number,
  displacement: number,
  beam: number,
  length: number,
  draft: number
}

interface ShipCategory {
  id: string,
  name: string
}

interface ShipGeneralType {
  id: string,
  name: string
}

interface ShipSection {
  id: string,
  name: string
}

export type {
  DPShipResponse,
  ShipCategory,
  ShipGeneralType,
  ShipSection,
  ShipGeneralForm,
  ShipSpecificationForm
}