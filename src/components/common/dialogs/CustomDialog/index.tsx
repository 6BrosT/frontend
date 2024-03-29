import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button, { BtnType } from "components/common/buttons/Button";
import LoadButton from "components/common/buttons/LoadingButton";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface CustomDialogProps extends DialogProps {
  title?: string;
  handleClose: () => void;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onHandleCancel?: () => void;
  onHanldeConfirm?: () => void;
  minWidth?: string;
  maxHeight?: string;
  actionsDisabled?: boolean;
  confirmDisabled?: boolean;
  isConfirmLoading?: boolean;
}

export default function CustomDialog({
  open,
  title,
  handleClose,
  children,
  cancelText,
  confirmText,
  onHandleCancel,
  onHanldeConfirm,
  minWidth,
  maxHeight,
  actionsDisabled,
  confirmDisabled,
  isConfirmLoading = false,
  ...props
}: CustomDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        "& .MuiDialog-paper": {
          minWidth: minWidth || "550px",
          maxHeight: maxHeight || null
        }
      }}
      PaperProps={{ sx: { borderRadius: "10px" } }}
      {...props}
    >
      <DialogTitle id='id'>
        <Box display='flex' alignItems='center'>
          <Box flexGrow={1}>{title || ""}</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
      {actionsDisabled && actionsDisabled === true ? null : (
        <DialogActions>
          <Button
            onClick={onHandleCancel ? onHandleCancel : handleClose}
            btnType={BtnType.Outlined}
            translation-key='common_cancel'
          >
            {cancelText || t("common_cancel")}
          </Button>
          <LoadButton
            loading={isConfirmLoading}
            onClick={onHanldeConfirm ? onHanldeConfirm : handleClose}
            colorname={"--white"}
            btnType={BtnType.Primary}
            autoFocus
            disabled={confirmDisabled}
            translation-key='common_confirm'
          >
            {confirmText || t("common_confirm")}
          </LoadButton>
        </DialogActions>
      )}
    </Dialog>
  );
}
