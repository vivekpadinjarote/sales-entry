import { useSelector } from "react-redux";

function VoucherPreview() {
  const header = useSelector((state) => state.header);
  const details = useSelector((state) => state.detail);

  const filteredDetails = details.filter((d) =>
    Object.values(d).some((v) => v != "")
  );

  return (
    <div className="voucher-preview p-3">
      <h3>Voucher #{header.vr_no}</h3>
      <p>Date: {header.vr_date}</p>
      <p>Account: {header.ac_name}</p>
      <p>Status: {header.status}</p>
      <p>Account Amount: <b>Rs. {header.ac_amt}</b></p>
      <hr />
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{d.item_code}-{d.item_name}</td>
              <td>{d.qty}</td>
              <td>{d.rate}</td>
              <td>{d.qty * d.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VoucherPreview;
