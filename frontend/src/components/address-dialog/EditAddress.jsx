import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  RadioCards,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import DialogBox from "../dialog-box/DialogBox";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useAddress } from "../../context/AddressContext";

const EditAddress = ({ address }) => {
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
  const { addresses, setAddresses, loading, setLoading } = useAddress();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLocation = async (pin) => {
    if (pin.length !== 6) return;

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0].Status === "Success" && data[0].PostOffice?.length) {
        const location = data[0].PostOffice[0];

        setFormData((prev) => ({
          ...prev,
          city: location.District,
          state: location.State,
          country: location.Country,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch location", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.patch(
        `${serverURL}/api/address/${address._id}`,
        { ...formData },
        {
          withCredentials: true,
        },
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogBox dialogBtnName={"Edit"} btnSize={"1"} btnVariant={"outline"}>
      <Dialog.Title color="gray">Edit Address</Dialog.Title>
      <Dialog.Description size="2" color="gray" mb="4">
        Update your address details for delivery.
      </Dialog.Description>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="medium" color="gray">
            Name
          </Text>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
            type="text"
            placeholder="Enter Your Full Name"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium" color="gray">
            Phone Number
          </Text>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
            type="number"
            placeholder="Enter Your Phone Number"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium" color="gray">
            Address line 1
          </Text>
          <input
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
            type="text"
            placeholder="Flat, House no, Building, Apartment"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium" color="gray">
            Address line 2
          </Text>
          <input
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
            type="text"
            placeholder="Area, Street, Sector, Village"
          />
        </label>
        <div className="flex gap-5">
          <label>
            <Text as="div" size="2" mb="1" weight="medium" color="gray">
              Pin Code
            </Text>
            <input
              name="pinCode"
              value={formData.pinCode}
              onChange={(e) => {
                fetchLocation(e.target.value);
                handleChange(e);
              }}
              className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
              type="number"
              placeholder="6-digit Pin Code"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="medium" color="gray">
              City
            </Text>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
              type="text"
              placeholder="City"
            />
          </label>
        </div>

        <Flex gap="3">
          <label className="w-full">
            <Text as="div" size="2" mb="1" weight="medium" color="gray">
              State
            </Text>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1.5 outline-0 rounded-md text-sm"
              type="text"
              placeholder="State"
            />
          </label>
          <label className="w-full">
            <Text as="div" size="2" mb="1" weight="medium" color="gray">
              Country
            </Text>
            <Select.Root
              defaultValue="India"
              value={formData.country}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, country: value }))
              }
            >
              <Select.Trigger style={{ width: "100%" }} />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="india">India</Select.Item>
                  <Select.Item value="USA">USA</Select.Item>
                  <Select.Item value="UK">UK</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>
        <div>
          <Text as="div" size="2" mb="1" weight="medium" color="gray">
            Type of Address
          </Text>
          <RadioCards.Root
            name="addressType"
            value={formData.addressType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, addressType: value }))
            }
            defaultValue="1"
            size="1"
            columns={{ initial: "1", sm: "3" }}
          >
            <RadioCards.Item value="home">
              <Text>Home</Text>
            </RadioCards.Item>
            <RadioCards.Item value="work">
              <Text>Work</Text>
            </RadioCards.Item>
            <RadioCards.Item value="other">
              <Text>Other</Text>
            </RadioCards.Item>
          </RadioCards.Root>
        </div>

        <Text as="label" size="2">
          <Flex gap="2">
            <Checkbox
              checked={formData.isDefault}
              onCheckedChange={(checked) => {
                console.log(checked);

                setFormData((prev) => ({ ...prev, isDefault: checked }));
              }}
            />
            Make This My Default Address
          </Flex>
        </Text>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Button onClick={handleSubmit}>Save</Button>
        {/* <Dialog.Close>
        </Dialog.Close> */}
      </Flex>
    </DialogBox>
  );
};

export default EditAddress;
