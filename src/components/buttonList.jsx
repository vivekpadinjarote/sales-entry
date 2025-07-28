import { useDispatch, useSelector } from "react-redux"
import { clearDetail } from "../features/detail/detailSlice"
import { clearHeader } from "../features/header/headerSlice"
import api from "../api/api"


function ButtonList(){
    const dispatch = useDispatch()
    const header = useSelector((status)=>status.header)
    const details = useSelector((status)=>status.detail)

    const filteredDetails = details.filter(d=>Object.values(d).some(v=>v!=''))

    const filteredHeaderData = Object.fromEntries(Object.entries(header).filter(([key])=>key!=="resetAt"))

    const detailTableData = filteredDetails.map((d,idx)=>({
        vr_no:Number(header.vr_no),
        sr_no:idx+1,
        ...d,
    }))

    const data = {
        "header_table":filteredHeaderData,
        "detail_table":detailTableData,
    }
    
    console.log("filtered:",filteredDetails)
    console.log(header)
    console.log("headerdata:",filteredHeaderData)
    console.log("detailsdata:",detailTableData)




    const newSale=()=>{
        if(filteredDetails.length!==0 || header){
            if(!window.confirm("Current sale details will be lost. Proceed?")){
                return;
            }
        }
        dispatch(clearHeader());
        dispatch(clearDetail());
        
    }

    const handleSubmit=async(data)=>{
        try{
            const res = await api.post('/header/multiple',data)
            console.log(res)
            // if(res){
            //     dispatch(clearHeader())
            //     dispatch(clearDetail())
            // }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <div className="button-container">
            <button onClick={()=> newSale()}>
                New Sale
            </button>
            <button>
                Print
            </button>
            <button onClick={()=>handleSubmit(data)} >
                Submit
            </button>
        </div>
        </>
    )
}

export default ButtonList