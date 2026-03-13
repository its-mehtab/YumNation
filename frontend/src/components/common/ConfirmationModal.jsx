import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";

const ConfirmationModal = ({ button, heading, description, onClick }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ← manage loading internally

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onClick();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(val) => !loading && setOpen(val)}
    >
      <AlertDialog.Trigger onClick={() => setOpen(true)}>
        {button}
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{heading}</AlertDialog.Title>
        <AlertDialog.Description size="2" className="text-gray-400">
          {description}
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button variant="solid" color="red" onClick={handleConfirm}>
            Confirm
            <Spinner loading={loading} />
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ConfirmationModal;
