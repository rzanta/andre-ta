import React, { useEffect, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import Button from "../../../components/Button";
import ContractEdit from "../../../assets/icons/contract_edit.svg";
import { MdOutlineCheck } from "react-icons/md";
import ModalAlert from "../../../components/ModalAlert";
import Dropdowns from "../../../components/Selection";
import TextField from "../../../components/InputField";
import Toast from "../../../components/Toast";

import {
  getEffectorList,
  deleteEffectorById,
  deleteSelectedEffector,
  getDetailEffector,
} from "../../../services/EffectorServices";

interface Effector {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
}

interface Filter {
  filterBy: string;
  filterValue: string;
  orderBy: string;
  order: string;
}

interface DeleteList {
  ids: string[];
}

export default function ShipList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [effectors, setEffector] = useState<Array<Effector>>([]);
  const [params, setParams] = useState<Filter>({
    filterBy: "name",
    filterValue: "",
    orderBy: "name",
    order: "asc",
  });
  const [deleteList, setDeleteList] = useState<DeleteList>({ ids: [] });
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [effectorDetail, setEffectorDetail] = useState([]);
  const [toast, setToast] = useState({
    variant: "",
    headerText: "",
    messageBody: "",
  });
  const [showToast, setShowToast] = useState(false);

  const options = [
    { id: "1", name: "Name" },
    { id: "2", name: "Manufacturer" },
    { id: "3", name: "Category" },
  ];

  const handleFilterAttrChange = (value: any) => {
    setParams({
      ...params,
      filterBy: value.name.toLowerCase(),
    });
  };

  const handleOrderChange = (value: string) => {
    setParams({
      ...params,
      orderBy: value,
      order: params.order === "asc" ? "desc" : "asc",
    });
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getEffector = async () => {
    try {
      const response = await getEffectorList(params);
      setEffector(response);
    } catch (e) {
      console.error(e);
    }
  };

  const getDetailEffectorById = async (id: string) => {
    try {
      const response = await getDetailEffector(id);
      setEffectorDetail(response);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEffectorbyId = async (id: string) => {
    try {
      await deleteEffectorById(id);
      getEffector();
      setToast({
        variant: "success",
        headerText: "Deleted Success",
        messageBody: "Selected data has been successfully deleted",
      });
      showToastMessage();
    } catch (e) {
      console.error(e);
      setToast({
        variant: "warning",
        headerText: "Deleted Failed",
        messageBody: "Selected data failed to be deleted",
      });
      showToastMessage();
    }
  };

  const deleteSelectedEffectors = async () => {
    try {
      await deleteSelectedEffector(deleteList);
      getEffector();
      setToast({
        variant: "success",
        headerText: "Deleted Success",
        messageBody: "Selected data has been successfully deleted",
      });
      showToastMessage();
    } catch (e) {
      console.error(e);
      setToast({
        variant: "warning",
        headerText: "Deleted Failed",
        messageBody: "Selected data failed to be deleted",
      });
      showToastMessage();
    }
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (effectorId: string) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [effectorId]: !checkedItems[effectorId],
    };
    setCheckedItems(updatedCheckedItems);

    const updatedDeleteList = updatedCheckedItems[effectorId]
      ? [...deleteList.ids, effectorId]
      : deleteList.ids.filter((id) => id !== effectorId);
    setDeleteList({ ids: updatedDeleteList });
  };

  const handleDeleteSelectedData = () => {
    if (deleteList.ids.length === 1) {
      deleteEffectorbyId(deleteList.ids[0]);
    } else if (deleteList.ids.length > 1) {
      deleteSelectedEffectors();
    }
    setModalOpen(false);
  };

  useEffect(() => {
    getEffector();
  }, [params]);

  useEffect(() => {
    const updatedCheckedItems: { [key: string]: boolean } = {};
    effectors.forEach((effector) => {
      updatedCheckedItems[effector.id] = selectAll;
    });
    setCheckedItems(updatedCheckedItems);

    if (selectAll) {
      setDeleteList({ ids: effectors.map((effector) => effector.id) });
    } else {
      setDeleteList({ ids: [] });
    }
  }, [selectAll, effectors]);

  return (
    <div className="h-80">
      <div className="flex">
        <div className="w-1/4 p-1">
          <Dropdowns
            className="border border-white bg-[#1B231C] text-white rounded-lg focus:border-[#2C4CBE] focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2"
            placeholder="Search and Select Filter"
            options={options}
            onSelect={(val) => handleFilterAttrChange(val)}
          />
        </div>
        <div className="w-3/4 p-1">
          <TextField
            className="rounded-lg w-full opacity-40 border border-white"
            id="searchField"
            placeholder="Search"
            editMode={true}
          />
        </div>
      </div>
      <div>
        {effectors.length === 0 ? (
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
                <span className="px-2 text-">All</span>
              </div>
              <div
                className="w-4/12 p-2 cursor-pointer flex align-center items-center"
                onClick={() => handleOrderChange("name")}
              >
                <span className="pr-2 hover:text-secondary flex items-center">
                  Name <FaSortAmountDown className="ml-3" />
                </span>
              </div>
              <div
                className="w-2/12 p-2 cursor-pointer flex align-center items-center"
                onClick={() => handleOrderChange("category")}
              >
                <span className="pr-2 hover:text-secondary flex items-center">
                  Category <FaSortAmountDown className="ml-3" />
                </span>
              </div>
              <div
                className="w-2/12 p-2 cursor-pointer flex align-center items-center"
                onClick={() => handleOrderChange("manufacturer")}
              >
                <span className="pr-2 hover:text-secondary flex items-center">
                  Manufacturer
                  <FaSortAmountDown className="ml-3" />
                </span>
              </div>
              <div className="w-1/12 p-2 justify-center flex">Action</div>
            </div>
            <div className="h-[63vh] overflow-auto">
              {effectors.map((effector) => (
                <div
                  key={effector.id}
                  className="flex justify-between items-center px-2 bg-[#494D49] hover:bg-secondary   text-white rounded-md my-1 text-sm font-bold"
                >
                  <div className="w-1/12 p-2 justify-center items-center flex">
                    <label className="cursor-pointer relative justify-center items-center flex">
                      <input
                        className="appearance-none h-4 w-4 border-2 border-white rounded outline outline-2 bg-[#252D26] peer"
                        type="checkbox"
                        checked={checkedItems[effector.id] || false}
                        onChange={() => handleCheckboxChange(effector.id)}
                      />
                      <MdOutlineCheck className="text-white text-xm absolute opacity-0 peer-checked:opacity-100" />
                    </label>
                  </div>
                  <div className="w-4/12 px-2">{effector.name}</div>
                  <div className="w-2/12 px-2">{effector.category}</div>
                  <div className="w-2/12 px-2">{effector.manufacturer}</div>
                  <div className="w-1/12 px-2 grid justify-items-center">
                    <button
                      className="text-blue-500"
                      onClick={() => getDetailEffectorById(effector.id)}
                    >
                      <ContractEdit />
                    </button>
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
