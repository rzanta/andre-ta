import React, { useEffect, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import Button from "@/components/Button";
import ContractEdit from "@/assets/icons/contract_edit.svg";
import { MdOutlineCheck } from "react-icons/md";
import ModalAlert from "@/components/ModalAlert";
import Selection from "@/components/Selection";
import TextField from "@/components/InputField";
import Toast from "@/components/Toast";
import { ApiHandler } from "@services/apiHandler";
import { DPSensorResponse } from "models";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


interface Filter {
  filterBy: string;
  filterValue: string;
  orderBy: string;
  order: string;
}

interface DeleteList {
  ids: string[];
}

const options = [
  { id:"0", key: "name", name: "Name" },
  { id:"1", key: "manufacturer", name: "Manufacturer" },
  { id:"2", key: "category", name: "Category" },
];

export default function SensorList() {
  const [sensors, setSensors] = useState<Array<DPSensorResponse>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useState<Filter>({
    filterBy: "name",
    filterValue: "",
    orderBy: "name",
    order: "asc",
  });
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Name");
  const [deleteList, setDeleteList] = useState<DeleteList>({ ids: [] });
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [toast, setToast] = useState({
    variant: "",
    headerText: "",
    messageBody: "",
  });
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const wait = (ms: number) => new Promise(
    (resolve) => setTimeout(resolve, ms)
  );

  const handleFilterAttrChange = (value: string) => {
    setSelectedFilter(value);
    setParams({
      ...params,
      filterBy: value.toLowerCase(),
    });
  };

  const handleFilterValueChange = async (value: string) => {
    setParams({
      ...params,
      filterValue: value,
    });
  };

  const handleOrderChange = (value: string) => {
    setParams({
      ...params,
      orderBy: value,
      order: params.order === "asc" ? "desc" : "asc",
    });
  };

  const getSensorList = async () => {
    setLoading(true)
    await wait(200);
    await ApiHandler.get('/dp/sensors', {
        params : params
    }).then((response) => {
      setSensors(response.data.data);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoading(false);
    });
  }


  const deleteSensorById = async (id: string) => {
    await ApiHandler.delete(`/dp/delete-sensor/${id}`).then((response) => {
      getSensorList();
      setToast({
        variant: "success",
        headerText: "Deleted Success",
        messageBody: "Selected data has been successfully deleted",
      });
      console.log(response.request.status);
      showToastMessage();
    }).catch((error) => {
      console.error(error);
      setToast({
        variant: "warning",
        headerText: "Deleted Failed",
        messageBody: "Selected data failed to be deleted",
      });
      showToastMessage();
    });
  };

  const deleteAllSensors = async () => {
    await ApiHandler.post(`/dp/delete-sensors`, {
      data: deleteList
    }).then((response) => {
      getSensorList();
      setToast({
        variant: "success",
        headerText: "Deleted Success",
        messageBody: "Selected data has been successfully deleted",
      });
      console.log(response)
      showToastMessage();
    }).catch((error) => {
      console.error(error);
      setToast({
        variant: "warning",
        headerText: "Deleted Failed",
        messageBody: "Selected data failed to be deleted",
      });
      showToastMessage();
    });
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (sensorId: string) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [sensorId]: !checkedItems[sensorId],
    };
    setCheckedItems(updatedCheckedItems);

    const updatedDeleteList = updatedCheckedItems[sensorId]
      ? [...deleteList.ids, sensorId]
      : deleteList.ids.filter((id) => id !== sensorId);
    setDeleteList({ ids: updatedDeleteList });
  };

  const handleDeleteSelectedData = () => {
    if (deleteList.ids.length === 1) {
      console.log(deleteList.ids[0]);
      deleteSensorById(deleteList.ids[0]);
    } else if (deleteList.ids.length > 1) {
      deleteAllSensors();
    }
    setModalOpen(false);
  };

  const handleNavigateToDetail = (id: string) => {
    navigate(`/data-preparation/sensor/${id}`);
  };

  useEffect(() => {
    getSensorList();
  }, [params]);

  useEffect(() => {
    const updatedCheckedItems: { [key: string]: boolean } = {};
    sensors.forEach((sensor) => {
      updatedCheckedItems[sensor.id] = selectAll;
    });
    setCheckedItems(updatedCheckedItems);

    if (selectAll) {
      setDeleteList({ ids: sensors.map((sensor) => sensor.id) });
    } else {
      setDeleteList({ ids: [] });
    }
  }, [selectAll, sensors]);


  return (
    <div className="h-80">
      <div className="flex">
        <div className="w-1/4 p-1">
          <Selection
            className="bg-[#1B231C] px-3 py-2 text-white"
            placeholder="Search and Select Filter"
            options={options}
            value={selectedFilter}
            onChange={(val) => handleFilterAttrChange(val)}
          />
        </div>
        <div className="w-3/4 p-1">
          <TextField
            className="rounded-lg w-full opacity-40 border border-white text-white z-10 bg-[#494D49] px-4 py-2"
            id="searchField"
            placeholder="Search"
            onChange={(e) => handleFilterValueChange(e.target.value)} name={""}
          />
        </div>
      </div>
      <div>
        {
          loading && (
            <div className="flex justify-center grid place-content-center h-[65vh]">
              <AiOutlineLoading3Quarters className="text-white animate-spin text-6xl"/>
            </div>
          )
        }
        {!loading && sensors.length === 0 ? (
          <div className="flex justify-center grid place-content-center h-[65vh]">
            <div>
              <p className="text-white">No Data Available</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mt-6 px-2 bg-charcoal text-white rounded-md font-bold text-sm">
              <div className="w-1/12 p-2 justify-center items-center flex">
                <label
                  htmlFor="check-box-all-data"
                  className="cursor-pointer relative justify-center items-center flex"
                >
                  <input
                    id="check-box-all-data"
                    className="appearance-none h-4 w-4 border-2 border-white rounded outline outline-2 bg-[#252D26] peer"
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                  <MdOutlineCheck className="text-white text-xm absolute opacity-0 peer-checked:opacity-100" />
                </label>
                <span className="px-2">All</span>
              </div>
              <div
                className="w-4/12 p-2 cursor-pointer flex align-center items-center"
                onClick={() => handleOrderChange("name")}
              >
                <span className="pr-2 flex hover:text-secondary items-center">
                  Name <FaSortAmountDown className="ml-3" />
                </span>
              </div>
              <div
                className="w-2/12 p-2 cursor-pointer flex align-center items-center"
                onClick={() => handleOrderChange("category")}
              >
                <span className="pr-2 flex hover:text-secondary items-center">
                  Category <FaSortAmountDown className="ml-3" />
                </span>
              </div>
              <div
                className="w-2/12 p-2 cursor-pointer flex align-center items-center"
                onClick={() => handleOrderChange("manufacturer")}
              >
                <span className="pr-2 flex hover:text-secondary items-center">
                  Manufacturer <FaSortAmountDown className="ml-3" />
                </span>
              </div>
              <div className="w-1/12 p-2 justify-center flex">Action</div>
            </div>
            <div className="h-[50vh] overflow-auto">
              {sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className="flex justify-between items-center px-2 bg-[#494D49] hover:bg-secondary text-white rounded-md my-1 text-sm font-bold"
                >
                  <div className="w-1/12 p-2 justify-center items-center flex">
                    <label className="cursor-pointer relative justify-center items-center flex">
                      <input
                        className="appearance-none h-4 w-4 border-2 border-white rounded outline outline-2 bg-[#252D26] peer"
                        type="checkbox"
                        checked={checkedItems[sensor.id] || false}
                        onChange={() => handleCheckboxChange(sensor.id)}
                      />
                      <MdOutlineCheck className="text-white text-xm absolute opacity-0 peer-checked:opacity-100" />
                    </label>
                  </div>
                  <div className="w-4/12 px-2">{sensor.name}</div>
                  <div className="w-2/12 px-2">{sensor.category}</div>
                  <div className="w-2/12 px-2">{sensor.manufacturer}</div>
                  <div className="w-1/12 px-2 grid justify-items-center">
                    <Button
                      className="text-blue-500 px-0 py-0"
                      onClick={() => handleNavigateToDetail(sensor.id)}
                    >
                        <ContractEdit />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid justify-items-end w-full">
              <div>
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="danger"
                  className="shadow-lg rounded-lg text-base"
                >
                  Delete Selected Item
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {showToast && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setShowToast(false)}
          ></div>
          <div className="fixed inset-x-0 bottom-3 left-3 z-20">
            <Toast
              className="w-72"
              variant={toast.variant}
              headerText={toast.headerText}
              messageBody={toast.messageBody}
              onClose={() => setShowToast(false)}
            />
          </div>
        </>
      )}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <ModalAlert
              className="rounded-lg"
              headerText="Delete Data?"
              headerColor="danger"
              messageText="This data will be permanently deleted from this list"
              onCancel={() => setModalOpen(false)}
              onConfirm={handleDeleteSelectedData}
            />
          </div>
        </>
      )}
    </div>
  );
}
