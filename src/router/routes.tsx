import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ScreenDataPreparation from "../pages/DataPreparation/ScreenDataPreparation";
import ScreenDataDisplayer from "../pages/DataDisplayer/ScreenDataDisplayer";
import ListShip from "../pages/DataDisplayer/ship/ListShip";
import DetailShip from "../pages/DataDisplayer/ship/DetailShip";
import ListPlatform from "../pages/DataDisplayer/ListShip2";
import ShipDataPreparation from "@/pages/DataPreparation/ShipManagement/Index";
import SensorDataPreparation from "@/pages/DataPreparation/SensorsManagement/Index";
import EditSensorForm from "@/pages/DataPreparation/SensorsManagement/EditSensorForm";
import IndexListShip from "@/pages/DataDisplayer/listShip";
import IndexListEffector from "@/pages/DataDisplayer/listEffector";
import IndexListSensor from "@/pages/DataDisplayer/listSensor";
import FormFilter from "@/components/dataDisplayer/FormFilter";
// import ListEffector from "../pages/DataDisplayer/effector/EffectorList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormFilter />,
  },
  {
    path: "/data-displayer/list/*",
    children: [
      {
        path: "list-ship",
        element: <IndexListShip />,
      },
      {
        path: "list-effector",
        element: <IndexListEffector />,
      },
      {
        path: "list-sensor",
        element: <IndexListSensor />,
      },
    ],
  },
  {
    path: "/data-displayer/*",
    children: [
      {
        path: "detail-ship/:id",
        element: <ScreenDataDisplayer />,
      },
      {
        path: "list-sensor/:id",
        element: <ScreenDataDisplayer />,
      },
      {
        path: "list-effector/:id",
        element: <ScreenDataDisplayer />,
      },
      { path: "detail-effector/:id", element: "" },
      { path: "detail-sensor/:id", element: "" },
    ],
  },
  {
    path: "/data-preparation/*",
    children: [
      {
        path: "ship",
        element: <ShipDataPreparation />,
      },
      {
        path: "sensor/:id",
        element: <EditSensorForm />,
      },
      {
        path: "sensor",
        element: <SensorDataPreparation />,
      },
      {
        path: "effector",
        element: <ScreenDataPreparation />,
      },
      {
        path: "notification",
        element: <ScreenDataPreparation />,
      },
    ],
  },
]);

export default router;
