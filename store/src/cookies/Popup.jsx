/* eslint-disable react/jsx-no-undef */
import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import React from "react";
import { shades } from "../theme";

function Popup({ onAccept }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onAccept}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontWeight={"bold"}>
          {"Cookies Consent"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color={"black"}>
            We use cookies to improve your experience on our website. By
            continuing to use our website, you <b>accept</b> our cookie policy.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: shades.neutral[600],
              color: "white",
              fontFamily: "system-ui",
              borderRadius: 0,
              "&:hover": { color: "black" },
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={onAccept}
            sx={{
              backgroundColor: shades.secondary[600],
              color: "white",
              fontFamily: "system-ui",
              borderRadius: 0,
              "&:hover": { color: "black" },
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup;
