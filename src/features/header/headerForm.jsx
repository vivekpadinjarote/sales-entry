import {useForm, useWatch} from 'react-hook-form'
import * as yup from 'yup'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import {yupResolver} from "@hookform/resolvers/yup"
import { setHeader } from './headerSlice'
import { useEffect, useRef } from 'react'

const schema = yup.object().shape({
    vr_no: yup.number().required("Voucher number is required"),
    vr_date: yup.string().required("Voucher date is required"),
    ac_name: yup.string().required("Account name is required"),
    status: yup.string().oneOf(["A","I"],"Select a Valid Status").required(),
})

function HeaderForm(){
    const dispatch = useDispatch()
    const header = useSelector((state)=>state.header)

    const todayDate = new Date().toISOString()

    console.log(todayDate)


    const {
        register,
        reset,
        control,
        formState:{errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:header,
    })

    const watchedFields = useWatch({control})
    const prevHeader = useRef(header)
    
    useEffect(() => {
  if (JSON.stringify(prevHeader.current) !== JSON.stringify(watchedFields)) {
    dispatch(setHeader(watchedFields));
    prevHeader.current = watchedFields;
  }
}, [watchedFields,dispatch]);

    useEffect(()=>{
      reset(header);
    },[header,reset])


    return(
        <>
        <form className="container mt-3 mb-5">
            <h2 className='text-center mb-5'>Sales Entry</h2>
            <div className='row'>
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

  <div className="mb-3 col-md-4" >
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

  <div className='row' >

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

  {/* <button type="submit" className="btn btn-primary">Save Header</button> */}
</form>

        </>
    )
}

export default HeaderForm