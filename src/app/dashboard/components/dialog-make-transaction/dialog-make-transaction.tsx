import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { RequiredFielTooltip } from "../../../shared-components/required-field-tooltip";
import { formatDate } from "../../../shared/utilities/format-date";
import { createTransactionGraphQL } from "../../../shared/utilities/graphql-request";
import { catchRequestError } from "../../../auth/auth.service";
import {
  MakeTransactionInterface,
  MakeTransactionResponseInterface,
} from "../../../shared/interfaces/transaction-interfaces";
import { toastUnknowGlobalError } from "../../../shared/toast/toast";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAmountAction } from "../../../store/user/slice";
import { addTransactionAction } from "../../../store/transactions/slice";

export const DialogMakeTransaction: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [formDate, setFormDate] = React.useState(dayjs(new Date()));
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const { register, handleSubmit } = useForm<MakeTransactionInterface>();
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const [createTransaction, { loading }] =
    useMutation<MakeTransactionResponseInterface>(createTransactionGraphQL);

  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmit(transactionData: MakeTransactionInterface) {
    try {
      const { amount, accountType, transactionType, subject } = transactionData;
      const date = formatDate(formDate.toString());
      const transaction = await createTransaction({
        variables: {
          amount: +amount,
          accountType,
          transactionType,
          subject,
          date,
        },
      });
      const transactionResponse = transaction.data?.createTransaction;
      if (transactionResponse) {
        if (transactionResponse.transactionType === "Debit") {
          dispatch(setAmountAction(user.amount - transactionResponse.amount));
        } else {
          dispatch(setAmountAction(user.amount + transactionResponse.amount));
        }
        dispatch(addTransactionAction(transactionResponse));
        handleClose();
      } else {
        toastUnknowGlobalError();
      }
    } catch (error) {
      catchRequestError(error);
    }
  }
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Transaction</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-block">
            <label className="form-label" htmlFor="transactionType">
              Type de transaction <RequiredFielTooltip />
            </label>
            <select
              className="form-select form-select-lg mb-3"
              id="transactionType"
              defaultValue={"Credit"}
              {...register("transactionType", { required: true })}
            >
              <option value={"Credit"}>Entrée</option>
              <option value={"Debit"}>Sortie</option>
            </select>
          </div>
          <div className="input-block">
            <label className="form-label" htmlFor="account">
              Compte <RequiredFielTooltip />
            </label>
            <select
              className="form-select form-select-lg mb-3"
              id="accountType"
              defaultValue={"Bank"}
              {...register("accountType", { required: true })}
            >
              <option value={"Bank"}>Compte banquaire</option>
              <option value={"Bourse"}>Bourse</option>
              <option value={"BoxMoney"}>Espèce à la maison</option>
            </select>
          </div>
          <div className="input-block">
            <label className="form-label" htmlFor="amount">
              Montant de la transaction <RequiredFielTooltip />
            </label>
            <input
              type="number"
              id="amount"
              min={0}
              step={100}
              className="form-control form-control-lg mb-3"
              {...register("amount", { required: true })}
            />
          </div>
          <div className="input-block">
            <label className="form-label" htmlFor="date">
              Date de la transaction <RequiredFielTooltip />
            </label>
            <DatePicker
              maxDate={dayjs(new Date())}
              onChange={(value) => setFormDate(value as Dayjs)}
              value={formDate}
              className="form-control mb-3"
              format="DD/MM/YYYY"
            />
          </div>
          <div className="input-block">
            <label className="form-label" htmlFor="subject">
              Motif de la transaction
            </label>
            <textarea
              style={{ height: "100px" }}
              id="subject"
              className="form-control form-control-lg"
              {...register("subject")}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuler</Button>
        <LoadingButton
          loading={loading}
          variant="outlined"
          loadingPosition="end"
          endIcon={<SaveIcon />}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Enregistrer
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
