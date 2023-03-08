/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogContent, DialogTitle, Dialog as Modal } from '@mui/material';

export default function Dialog({ ...rest }): any {
  return (
    <Modal open={rest.open || false} {...rest.dialog}>
      <DialogTitle>{rest.title || 'Dialog Title'}</DialogTitle>
      <DialogContent>{rest.children}</DialogContent>
    </Modal>
  );
}
