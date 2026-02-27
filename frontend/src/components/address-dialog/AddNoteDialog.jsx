import React from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import DialogBox from "../dialog-box/DialogBox";

const AddNoteDialog = () => {
  return (
    <DialogBox dialogBtnName={"Add Note"} btnVariant="soft">
      <Dialog.Title>Add Note</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to your profile.
      </Dialog.Description>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            defaultValue="freja@example.com"
            placeholder="Enter your email"
          />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Flex>
    </DialogBox>
  );
};

export default AddNoteDialog;
