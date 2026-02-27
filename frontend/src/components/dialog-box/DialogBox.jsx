import React from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

const DialogBox = ({
  children,
  size = "450px",
  dialogBtnName,
  btnSize = 2,
  btnVariant = "solid",
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant={btnVariant} size={btnSize}>
          {dialogBtnName}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth={size}>{children}</Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogBox;
