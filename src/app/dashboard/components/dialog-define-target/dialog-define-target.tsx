import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useMutation } from "@apollo/client";
import { updateUserTarget } from "../../../shared/utilities/graphql-request";
import { updateUserTargetInterface } from "../../../shared/interfaces/user-interfaces";
import { catchRequestError } from "../../../auth/auth.service";
import { toastError } from "../../../shared/toast/toast";
import { setTargetAction } from "../../../store/user/slice";
import "./dialog-define-target.scss";
import MoneyDisplay from "../money-display/money-display";

export const DialogDifineTarget: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [target, setTarget] = useState(user.target ? user.target : 0);
  const [loading, setLoading] = useState(false);
  const [onUpdateTarget] =
    useMutation<updateUserTargetInterface>(updateUserTarget);
  const handleClose = () => {
    setOpen(false);
  };
  const inputProps = {
    step: 100,
    min: 0,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (target <= 0) {
        toastError("Le montant de l'objectif doit être superieur à 0");
        setLoading(false);
        return;
      }
      if (target === user.target) {
        setLoading(false);
        setOpen(false);
        return;
      }
      const userUpdated = await onUpdateTarget({
        variables: { target },
        fetchPolicy: "no-cache",
      });

      const userData = userUpdated.data?.updateUserTarget;
      if (userData) {
        dispatch(setTargetAction(target));
        setOpen(false);
      }
    } catch (error) {
      catchRequestError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user.target) {
      setTarget(user.target);
    }
  }, [user.target]);

  return (
    <Dialog className="dialog-define-target" open={open} onClose={handleClose}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="form-dialog-define-target"
      >
        <DialogTitle>
          {" "}
          {user.target === 0
            ? "Définier mon objectif pour 6 mois"
            : "Modifier mon objectif"}{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Combien comptez vous epargner par mois ? ( min 10 % de tous vos
            revenus )
          </DialogContentText>
          <TextField
            className="my-3"
            autoFocus
            value={target}
            onChange={(e) => setTarget(+e.target.value)}
            margin="dense"
            id="target"
            label="Entrer le montant"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={inputProps}
          />
          <DialogContentText>
            Votre épargne sur 6 mois est donc de :{" "}
            <span className="saving">
              {" "}
              <MoneyDisplay amount={target * 6} />
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="reset" disabled={loading} onClick={handleClose}>
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
