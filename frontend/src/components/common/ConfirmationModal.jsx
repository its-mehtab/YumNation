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
        <AlertDialog.Title asChild>
          <h2 className="font-[Poppins] text-lg font-bold text-gray-700">
            {heading}
          </h2>
        </AlertDialog.Title>

        <AlertDialog.Description asChild>
          <p className="text-[15px] text-gray-400">{description}</p>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel asChild>
            <button className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <button
            onClick={handleConfirm}
            className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-40"
          >
            Confirm
            <Spinner loading={loading} />
          </button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ConfirmationModal;
