import { CircularProgress } from "@mui/material";

const SubmitButton: React.FC<{ text: string; loading: boolean }> = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center btn-and-spiner">
      <button className="btn w-100 btn-success btn-lg" type="submit">
        {props.text}
      </button>
      {props.loading && (
        <CircularProgress className="mx-2" size={"45px"} color="primary" />
      )}
    </div>
  );
};

export default SubmitButton;
