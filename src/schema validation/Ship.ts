import * as yup from 'yup';

export const GeneralInformation = yup.object().shape({
  class: yup.string().required("Class is required"),
  hullNumber: yup.string().required("Hull number is required"),
  name: yup.string().required("Name is required"),
  environment: yup.string().required("Environment is required"),
  shipGeneralTypeId: yup.string().required("General type is required"),
  shipCategoryId: yup.string().required("Category is required"),
  warfareCapabilitiesIds: yup.array().required("Warfare capabilities is required"),
  lethalityLevel: yup.string().required("Lethality level is required"),
  manufacturerId: yup.string().required("Manufacturer is required"),
  ownerId: yup.string().required("User is required"),
  hullDesign: yup.string().required("Hull design is required"),
  commissionedYear: yup.number().required("Commissioned year is required"),
  sailing: yup.string().required("Sailing is required"),
  crew: yup.number().required("Crew is required"),
});

export const Specification = yup.object().shape({
  cruisingSpeed: yup.number().typeError("Type input must be a number").required("Cruising speed is required").positive(),
  maxSpeed: yup.number().typeError("Type input must be a number").required("Max speed is required").positive(),
  length: yup.number().typeError("Type input must be a number").required("Length is required").positive(),
  beam: yup.number().typeError("Type input must be a number").required("Beam is required").positive(),
  draft: yup.number().typeError("Type input must be a number").required("Draft is required").positive(),
  displacement: yup.number().typeError("Type input must be a number").required("Displacement is required").positive(),
  combatRange: yup.number().typeError("Type input must be a number").required("Combat range is required").positive(),
});