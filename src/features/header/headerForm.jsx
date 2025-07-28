

function HeaderForm({register,errors,header}) {



  return (
    <>
      <form className="container mt-3 mb-5">
        <h2 className="text-center mb-5">Sales Entry</h2>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">Voucher No</label>
            <input
              type="number"
              {...register("vr_no")}
              className="form-control"
            />
            {errors.vr_no && (
              <div className="text-danger small">{errors.vr_no.message}</div>
            )}
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label">Voucher Date</label>
            <input
              type="date"
              {...register("vr_date")}
              className="form-control"
            />
            {errors.vr_date && (
              <div className="text-danger small">{errors.vr_date.message}</div>
            )}
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label">Status</label>
            <select {...register("status")} className="form-select">
              <option value="">Select</option>
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </select>
            {errors.status && (
              <div className="text-danger small">{errors.status.message}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-9">
            <label className="form-label">Account Name</label>
            <input
              type="text"
              {...register("ac_name")}
              className="form-control"
            />
            {errors.ac_name && (
              <div className="text-danger small">{errors.ac_name.message}</div>
            )}
          </div>

          <div className="mb-3 col-md-3">
            <label className="form-label">Total Amount</label>
            <input
              type="number"
              className="form-control"
              value={header.ac_amt}
              readOnly
            />
          </div>
        </div>

        
      </form>
    </>
  );
}

export default HeaderForm;
