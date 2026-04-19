import * as Dialog from "@radix-ui/react-dialog";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ open = true }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-orange/60 flex items-center justify-center">
          <CircularProgress
            enableTrackSlot
            color="primary"
            aria-label="Loading…"
          />
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Loader;
