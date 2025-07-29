import { useDispatch, useSelector } from "react-redux";
import { clearDetail } from "../features/detail/detailSlice";
import { clearHeader, setHeader } from "../features/header/headerSlice";
import api from "../api/api";
import { useState } from "react";

function ButtonList({ handleFormSave, handlePrint }) {
  const dispatch = useDispatch();
  const header = useSelector((status) => status.header);
  const details = useSelector((status) => status.detail);
  const [showPrint,setShowPrint] = useState(false)

  const filteredDetails = details.filter((d) =>
    Object.values(d).some((v) => v != "")
  );

  const newSale = () => {
    if (filteredDetails.length !== 0 || header) {
      if (!window.confirm("Current sale details will be lost. Proceed?")) {
        return;
      }
    }
    dispatch(clearHeader());
    dispatch(clearDetail());
    setShowPrint(false)
  };

  function convertDateFormat(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${year}-${day}-${month}`;
  }

  const onValid = async (data) => {
    const total = details.reduce((sum, detail) => {
      return sum + parseFloat(detail.qty || 0) * parseFloat(detail.rate || 0);
    }, 0);
    console.log("data:", data);
    dispatch(setHeader({ ...data, ac_amt: total }));

    alert("Validation Success");

    const filteredHeaderData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== "resetAt")
    );
    console.log("filtered:", filteredHeaderData);
    const detailTableData = filteredDetails.map((d, idx) => ({
      vr_no: filteredHeaderData.vr_no,
      sr_no: idx + 1,
      ...d,
      qty: parseInt(d.qty, 10),
      rate: parseInt(d.rate, 10),
    }));

    const formattedHeaderData = {
      ...filteredHeaderData,
      vr_date: convertDateFormat(filteredHeaderData.vr_date),
      ac_amt: total,
    };

    const saleData = {
      header_table: formattedHeaderData,
      detail_table: detailTableData,
    };

    console.log(saleData);
    try {
      const res = await api.post("header/multiple", saleData);
      console.log(res);
      alert(res.statusText);
      setShowPrint(true)
    } catch (err) {
      console.error("API Error:", err);
      alert("Voucher number should be unique");
    }
  };

  const onInvalid = (errors) => {
    console.error(errors);
    if (errors.vr_no && errors.ac_name) {
      throw new Error(
        "Validation failed, Voucher number and Account name required"
      );
    } else if (errors.status) {
      throw new Error("validation failed, Select a valid Status");
    } else {
      throw new Error(`validation failed, Fill all Fields`);
    }
  };

  const handleSubmit = async () => {
    const confirm = window.confirm("Check details?");
    if (!confirm) return;

    try {
      await handleFormSave(onValid, onInvalid)();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="button-container">
        <button onClick={() => newSale()}>New Sale</button>
        <button onClick={handlePrint} disabled={!showPrint}>Print</button>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </>
  );
}

export default ButtonList;
