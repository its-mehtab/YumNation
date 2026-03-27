import React from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

const DialogBox = ({
  btn,
  children,
  size = "450px",
  dialogBtnName,
  btnSize = 2,
  btnVariant = "solid",
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {btn || (
          <Button variant={btnVariant} size={btnSize}>
            {dialogBtnName}
          </Button>
        )}
      </Dialog.Trigger>

      <Dialog.Content maxWidth={size}>{children}</Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogBox;
