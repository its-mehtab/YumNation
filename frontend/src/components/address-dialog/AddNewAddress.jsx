import React, { useState } from "react";
import DialogBox from "../dialog-box/DialogBox";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { useAddress } from "../../context/user/AddressContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import AddressForm from "./AddressForm";

const AddNewAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
    city: "",
    state: "",
    country: "India",
    addressType: "home",
    isDefault: false,
  });

  const { serverURL } = useAuth();
  const { setAddresses, loading, setLoading } = useAddress();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${serverURL}/api/address`,
        { ...formData },
        {
          withCredentials: true,
        },
      );

      setAddresses((prev) => {
        const updatedAddresses = prev.map((item) => {
          return data.isDefault ? { ...item, isDefault: false } : item;
        });

        return [...updatedAddresses, data];
      });
      setIsModalOpen(false);
      notifySuccess("Address Added successfully");
      setFormData({
        fullName: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        pinCode: "",
        city: "",
        state: "",
        country: "India",
        addressType: "home",
        isDefault: false,
      });
    } catch (error) {
      notifyError(
        error?.response?.data.message || error.message || "Address Add failed",
      );
      console.log(
        "Edit Address Error:",
        error?.response?.data || error.message,
      );
    }
  };

  return (
    <DialogBox
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      dialogBtnName={"Add New Address"}
      btnVariant={"outline"}
    >
      <AddressForm
        title={"Add a new address"}
        description={"Add your address details for delivery."}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </DialogBox>
  );
};

export default AddNewAddress;
