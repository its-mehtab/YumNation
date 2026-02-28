import React from "react";
import { LocationIcon } from "../../assets/icon/Icons";
import AddressDialog from "../address-dialog/AddressDialog";
import EditAddress from "../address-dialog/EditAddress";
import { useAddress } from "../../context/AddressContext";

const AddressBox = () => {
  const { addresses } = useAddress();
  const defaultAddress = addresses?.find((curr) => curr.isDefault === true);

  return (
    <>
      {defaultAddress && (
        <>
          <h3 className="text-[#fc8019] text-xs capitalize font-semibold">
            Your address
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <LocationIcon color={"#fc8019"} />
            <div className="text-sm font-medium text-gray-700">
              {`${defaultAddress.city}, ${defaultAddress.state}`}
            </div>
            <div className="ms-auto">
              <EditAddress address={defaultAddress} />
            </div>
          </div>
          <p className="mt-2 text-[13px] text-gray-500">
            {defaultAddress.addressLine1}, {defaultAddress.addressLine2},{" "}
            {defaultAddress.pinCode}, <br /> {defaultAddress.city},{" "}
            {defaultAddress.state}, {defaultAddress.country}
          </p>
        </>
      )}

      <div className="flex gap-2 items-center mt-3">
        <AddressDialog />
      </div>
    </>
  );
};

export default AddressBox;
