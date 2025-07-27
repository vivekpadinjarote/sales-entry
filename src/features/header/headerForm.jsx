import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import {yupResolver} from "@hookform/resolvers/yup"
import { setHeader } from './headerSlice'

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
        handleSubmit,
        formState:{errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:header,
    })

    const onSubmit = (date)=>{
        dispatch(setHeader({...data}));
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div>
                <label> Voucher No</label>
                <input type='number' {...register("vr_no")} />
                <p>{errors.vr_no?.message}</p>
            </div>

            <div>
                <label>Voucher Date</label>
                <input type='date' defaultValue={todayDate.split("T")[0]} {...register("vr_date")} />
                <p>{errors.vr_date?.message}</p>
            </div>

            <div>
                <label>Account Name</label>
                <input type='text' {...register("ac_name")} />
                <p>{errors.ac_name?.message}</p>
            </div>

            <div>
                <label>Status</label>
                <select {...register("status")}>
                <option value="">Select</option>
                <option value="A">Active</option>
                <option value="I">Inactive</option>
                </select>
                <p>{errors.status?.message}</p>
            </div>

            <div>
                <label>Total Amount</label>
                <input type="number" value={header.ac_amt} readOnly />
            </div>

            <button type="submit">Save Header</button>
        </form>
        </>
    )
}

export default HeaderForm