import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../../store/user/hooks";
import { useMutation } from "@apollo/client";
import { updateUserTarget } from "../../../shared/utilities/graphql-request";
import { updateUserTargetInterface } from "../../../shared/user-interface/interface";
import { updateUser } from "../../../store/user/slice";

export const DialogDifineTarget: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [target, setTarget] = useState(user.target || 0);
  const [loading, setLoading] = useState(false);
  const [onUpdateTarget] =
    useMutation<updateUserTargetInterface>(updateUserTarget);
  const handleClose = () => {
    setOpen(false);
  };
  const inputProps = {
    step: 500,
    min: 0,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userUpdated = await onUpdateTarget({ variables: { target } });
      const userData = userUpdated.data?.updateUserTarget;
      if (userData) {
        dispatch(updateUser({ ...user, target: userData.target }));
      }
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogTitle>
          {" "}
          {user.target === 0
            ? "Definier mon objectif"
            : "Modifier mon objectif"}{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Combien comptez vous epargner par mois ? ( min 10 % de tous vos
            revenus )
          </DialogContentText>
          <TextField
            autoFocus
            value={target}
            onChange={(e) => setTarget(+e.target.value)}
            margin="dense"
            id="target"
            label="Enter le montant"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={inputProps}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Anuler
          </Button>
          <LoadingButton
            loading={loading}
            variant="outlined"
            loadingPosition="end"
            endIcon={<SaveIcon />}
            type="submit"
          >
            Enregistrer
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
