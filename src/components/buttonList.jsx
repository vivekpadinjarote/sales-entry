import { useDispatch, useSelector } from "react-redux"
import { clearDetail } from "../features/detail/detailSlice"
import { clearHeader } from "../features/header/headerSlice"
import api from "../api/api"


function ButtonList({handleFormSave, toggleSave}){
    const dispatch = useDispatch()
    const header = useSelector((status)=>status.header)
    const details = useSelector((status)=>status.detail)

    const filteredDetails = details.filter(d=>Object.values(d).some(v=>v!=''))

    const filteredHeaderData = Object.fromEntries(Object.entries(header).filter(([key])=>key!=="resetAt"))

    const detailTableData = filteredDetails.map((d,idx)=>({
        vr_no:header.vr_no,
        sr_no:idx+1,
        ...d,
        qty:parseInt(d.qty,10),
        rate:parseInt(d.rate,10),
        
    }))

    const saleData = {
        header_table:filteredHeaderData,
        detail_table:detailTableData,
    }

    // console.log("filtered:",filteredDetails)
    // console.log(header)
    // console.log("headerdata:",filteredHeaderData)
    // console.log("detailsdata:",detailTableData)

    console.log("saleData:",saleData)

    let isDisabled= !toggleSave || filteredDetails.length===0


    const newSale=()=>{
        if(filteredDetails.length!==0 || header){
            if(!window.confirm("Current sale details will be lost. Proceed?")){
                return;
            }
        }
        dispatch(clearHeader());
        dispatch(clearDetail());
        
    }

    function convertDateFormat(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${year}-${day}-${month}`;
}

    const handleSubmit=async(data)=>{
        try {
        const formattedHeader = {
            ...data.header_table,
            vr_date: convertDateFormat(data.header_table.vr_date)
        };

        const formattedData = {
            ...data,
            header_table: formattedHeader
        };

        const res = await api.post("header/multiple", formattedData);
        console.log(res);
        alert(res)
    } catch (err) {
        console.error("API Error:", err);
    }
    }


    console.log("save:",toggleSave)
    return(
        <>
        <div className="button-container">
            <button onClick={()=> newSale()}>
                New Sale
            </button>
            <button>
                Print
            </button>
            <button onClick={handleFormSave} >
                Save
            </button>
            <button onClick={()=>handleSubmit(saleData)} disabled={isDisabled}>
                Submit
            </button>
        </div>
        </>
    )
}

export default ButtonList