import type { ReactElement } from 'voby';
import { useEffect, $ } from 'voby';
import { Button } from "@react-md/button";
import { 
 Dialog, 
 DialogContent, 
 DialogFooter, 
 DialogHeader, 
 DialogTitle,  } from "@react-md/dialog";
import type { FileValidationError } from "@react-md/form";

import ErrorRenderer from "./ErrorRenderer";

export interface ErrorModalProps {
  errors: readonly FileValidationError<never>[];
  clearErrors(): void;
}

export default function ErrorModal({
  errors,
  clearErrors,
}: ErrorModalProps): Child {
  // Having the visibility being derived on the `errors.length > 0` would make
  // it so the errors are cleared during the exit animation. To fix this, keep a
  // separate `visible` state and set it to `true` whenever a new error is
  // added. When the modal is closed, set the `visible` state to false and wait
  // until the modal has closed before clearing the errors.
  const visible = $(false);
  useEffect(() => {
    visible(errors.length > 0);
  });

  const onRequestClose = (): void => {
    visible(false);
  };

  return (
    <Dialog
      id="error-modal"
      aria-labelledby="error-modal-title"
      modal
      onRequestClose={onRequestClose}
      visible={visible}
      onExited={clearErrors}
    >
      <DialogHeader>
        <DialogTitle id="error-modal-title">File Upload Errors</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {errors.map((error) => (
          <ErrorRenderer key={error.key} error={error} />
        ))}
      </DialogContent>
      <DialogFooter>
        <Button onClick={onRequestClose}>Okay</Button>
      </DialogFooter>
    </Dialog>
  );
}
