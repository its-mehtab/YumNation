import React, { useEffect, useState } from "react";
import { Dialog } from "@radix-ui/themes";
import DialogBox from "../dialog-box/DialogBox";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useAddress } from "../../context/AddressContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import AddressDialog from "./AddressDialog";
import AddressForm from "./AddressForm";

const EditAddress = ({ address }) => {
  const [isModalOpen, setIsModalOpen] = useState();

  const [formData, setFormData] = useState({
    fullName: address.fullName,
    phoneNumber: address.phoneNumber,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    pinCode: address.pinCode,
    city: address.city,
    state: address.state,
    country: address.country,
    addressType: address.addressType,
    isDefault: address.isDefault,
  });

  const { serverURL } = useAuth();
  const { setAddresses, loading, setLoading } = useAddress();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.patch(
        `${serverURL}/api/address/${address._id}`,
        { ...formData },
        {
          withCredentials: true,
        },
      );

      setAddresses((prev) =>
        prev.map((item) => {
          return item._id === data._id
            ? data
            : data.isDefault
              ? { ...item, isDefault: false }
              : item;
        }),
      );
      setIsModalOpen(false);
      notifySuccess("Address update successfully");
    } catch (error) {
      notifyError("Address updated failed");
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
      dialogBtnName={"Edit"}
      btnSize={"1"}
      btnVariant={"outline"}
    >
      <AddressForm
        title={"Edit Address"}
        description={"Update your address details for delivery."}
        address={address}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </DialogBox>
  );
};

export default EditAddress;
