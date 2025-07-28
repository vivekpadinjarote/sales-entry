import * as yup from "yup";

const schema = yup.object().shape({
  vr_no: yup.number().required("Voucher number is required"),
  vr_date: yup.string().required("Voucher date is required"),
  ac_name: yup.string().required("Account name is required"),
  status: yup.string().oneOf(["A", "I"], "Select a Valid Status").required(),
});

export default schema