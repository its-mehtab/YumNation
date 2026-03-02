import React from "react";
import { LocationIcon } from "../../assets/icon/Icons";
import AddressDialog from "../address-dialog/AddressDialog";
import EditAddress from "../address-dialog/EditAddress";
import { useAddress } from "../../context/AddressContext";
import AddNewAddress from "../address-dialog/AddNewAddress";
import AddressSkeleton from "../skeleton/AddressSkeleton";
import { Button } from "@radix-ui/themes";

const AddressBox = () => {
  const { addresses, loading } = useAddress();
  const defaultAddress = addresses?.find((curr) => curr.isDefault === true);

  return loading ? (
    <AddressSkeleton />
  ) : (
    <>
      <h3 className="text-[#fc8019] text-xs capitalize font-semibold">
        Your address
      </h3>
      {addresses?.length === 0 ? (
        <div className="mt-3 p-4 border border-dashed border-gray-300 rounded-lg">
          <div className="flex items-center gap-1.5">
            <LocationIcon color="#fc8019" />
            <p className="text-sm font-medium text-gray-700">
              No address added
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Add your delivery location to start ordering your favorite meals.
          </p>

          <div className="mt-3">
            <AddNewAddress />
          </div>
        </div>
      ) : !defaultAddress ? (
        <div className="mt-3 p-4 border border-orange-300 bg-orange-50 rounded-lg">
          <div className="flex gap-1.5">
            <LocationIcon color="#fc8019" />
            <p className="text-sm font-medium text-gray-700">
              Select a default delivery address
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            You have saved addresses. Please choose one as default to continue.
          </p>

          <div className="mt-3">
            <AddressDialog />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 mt-2">
            <LocationIcon color="#fc8019" />
            <div className="text-sm font-medium text-gray-700">
              {`${defaultAddress.city}, ${defaultAddress.state}`}
            </div>
            <div className="ms-auto">
              <EditAddress address={defaultAddress} />
            </div>
          </div>

          <p className="mt-2 text-[13px] text-gray-500">
            {defaultAddress.addressLine1}, {defaultAddress.addressLine2},{" "}
            {defaultAddress.pinCode}, <br />
            {defaultAddress.city}, {defaultAddress.state},{" "}
            {defaultAddress.country}
          </p>

          <div className="flex gap-2 items-center mt-3">
            <AddressDialog />
          </div>
        </>
      )}
    </>
  );
};

export default AddressBox;
