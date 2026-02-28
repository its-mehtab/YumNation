import React from "react";
import { LocationIcon } from "../../assets/icon/Icons";
import AddressDialog from "../address-dialog/AddressDialog";
import EditAddress from "../address-dialog/EditAddress";
import ChangeAddressDialog from "../address-dialog/ChangeAddressDialog";

const AddressBox = () => {
  return (
    <>
      <h3 className="text-[#fc8019] text-xs capitalize font-semibold">
        Your address
      </h3>
      <div className="flex items-center gap-1.5 mt-2">
        <LocationIcon color={"#fc8019"} />
        <div className="text-sm font-medium text-gray-700">
          No address added
        </div>
        <div className="ms-auto">
          <ChangeAddressDialog />
        </div>
        {/* <div className="text-xs font-medium px-3 py-1 border text-[#fc8019] border-[#fc8019] rounded ms-auto hover:text-white hover:bg-[#fc8019] transition-all cursor-pointer">
          Change
        </div> */}
      </div>
      <p className="mt-2 text-[13px] text-gray-500">
        Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
        incididunt.
      </p>
      <div className="flex gap-2 items-center mt-3">
        <AddressDialog />
        <EditAddress />
      </div>
    </>
  );
};

export default AddressBox;
