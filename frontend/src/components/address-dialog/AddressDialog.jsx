import React from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import DialogBox from "../dialog-box/DialogBox";
import { useAddress } from "../../context/AddressContext";
import { LocationIcon } from "../../assets/icon/Icons";
import EditAddress from "./EditAddress";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import AddNewAddress from "./AddNewAddress";

const AddressDialog = () => {
  const { addresses, setAddresses } = useAddress();
  const { serverURL } = useAuth();

  const handleDefault = async (id) => {
    try {
      const { data } = await axios.patch(
        `${serverURL}/api/address/${id}`,
        { isDefault: true },
        { withCredentials: true },
      );

      setAddresses((prev) => {
        return prev.map((item) =>
          item._id === id ? data : { ...item, isDefault: false },
        );
      });

      notifySuccess("Default Address Changed");
    } catch (error) {
      notifyError(error?.response?.data || error.message);
      console.log(
        "Edit Address Error:",
        error?.response?.data || error.message,
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${serverURL}/api/address/${id}`, {
        withCredentials: true,
      });

      setAddresses((prev) => {
        return prev.filter((item) => item._id !== id);
      });
      notifySuccess("Address Deleted");
    } catch (error) {
      notifyError(error?.response?.data || error.message);
      console.log(
        "Edit Address Error:",
        error?.response?.data || error.message,
      );
    }
  };

  return (
    <DialogBox dialogBtnName={"Change Address"}>
      <Dialog.Title color="gray">Change Address</Dialog.Title>
      <Dialog.Description size="2" mb="4" color="gray">
        Update your address for delivery.
      </Dialog.Description>

      {addresses?.map((address) => {
        return (
          <div className="py-3 border-t border-gray-200" key={address._id}>
            {address.isDefault && (
              <h3 className="text-[#fc8019] text-xs capitalize font-semibold mb-3">
                Default Address
              </h3>
            )}

            <div className="flex gap-1.5 mt-1">
              <LocationIcon color={"#fc8019"} />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  {`${address.city}, ${address.state}`}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {address.fullName}
                </div>
                <p className="mt-1 text-[13px] text-gray-500">
                  {address.addressLine1}, {address.addressLine2}, <br />{" "}
                  {address.city}, {address.state}, {address.pinCode},{" "}
                  {address.country}
                </p>
                <p className="mt-1 text-[13px] text-gray-500">
                  {address.phoneNumber}
                </p>
                {!address.isDefault && (
                  <div className="flex gap-3 mt-2">
                    <Button
                      size="2"
                      color="orange"
                      onClick={() => handleDefault(address._id)}
                    >
                      Deliver here
                    </Button>

                    <Button
                      onClick={() => handleDelete(address._id)}
                      size="2"
                      variant="soft"
                      color="red"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
              <div className="ms-auto">
                <EditAddress address={address} />
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex pt-4 items-center gap-4 justify-between border-t border-gray-200">
        {addresses?.length < 5 && (
          // <Button variant="outline">Add New Address</Button>
          <AddNewAddress />
        )}
        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </div>
    </DialogBox>
  );
};

export default AddressDialog;
