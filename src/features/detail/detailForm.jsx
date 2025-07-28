import { useDispatch, useSelector } from "react-redux"
import api from "../../api/api"
import { useEffect, useState } from "react";
import { setTotalAmount } from "../header/headerSlice";
import { addRow,removeRow, updateRow } from "./detailSlice";
import Select from 'react-select'
import { MdDelete } from "react-icons/md";

function DetailForm(){
    const dispatch = useDispatch();
    const details = useSelector((state)=>state.detail)
    const [items, setItems] = useState([])

    useEffect(()=>{
        const fetchItems = async ()=>{
        try{
            const res = await api.get('/item')
                setItems(res.data);
        }catch (err){
            console.log(err)
        }
    }
    fetchItems()
    },[])

    useEffect(()=>{
        const total = details.reduce((sum,detail)=>{
            return sum = sum + (parseFloat(detail.qty||0) * parseFloat(detail.rate||0));
        },0)
        dispatch(setTotalAmount(total))
    },[details,dispatch])

    useEffect(() => {
  const last = details[details.length - 1];
  const isLastRowFilled = Object.values(last).some(v => v !== '');
  if (last && isLastRowFilled) {
    dispatch(addRow({
      item_code: '',
      item_name: '',
      description: '',
      qty: '',
      rate: ''
    }));
  }
}, [details, dispatch]);


    
                console.log(items)


    const handleRemove = (index)=>{
        dispatch(removeRow(index));
    };

    const handleChange = (index,field,value)=>{
        dispatch(updateRow({index,field,value}))

        if(field==='item_code'){
            const item = items.find(i=>i.item_code === value);
            if(item){
                dispatch(updateRow({index,field:"item_name",value:item.item_name}))
            }
        }
    }

    const itemOptions = items.map(item=>({
        value: item.item_code,
        label: item.item_code,
    }))

    const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#5981acff" : "white",
      ":hover": {
        backgroundColor: "#d3d0d0ff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    input: (provided) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
  }

    return (
        <>
        <div className="container mt-4">
            <div className="col d-flex mb-3" > 
  <h4 className="mb-1 m-auto">Detail Table</h4>
</div>
  <div className="table-responsive">
    <table className="table table-bordered align-middle text-center">
      <thead className="table-light">
        <tr>
          <th className="col-0">Sl No</th>
          <th className="col-2">Item Code</th>
          <th className="col-3">Item Name</th>
          <th className="col-4">Description</th>
          <th className="col-1">Qty</th>
          <th className="col-1">Rate</th>
          <th className="col-1">Sub Total</th>
          <th className="col-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {details.map((detail, idx) => (
          <tr key={idx} >
            <td>{idx + 1}</td>
            <td>
              <Select
                options={itemOptions}
                value={itemOptions.find(opt => opt.value === detail.item_code) || null}
                onChange={e => handleChange(idx, "item_code", e?.value)}
                placeholder="Select"
                styles={selectStyle}
              />
            </td>
            <td>
              <input
                className="form-control"
                value={detail.item_name}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={detail.description}
                onChange={e => handleChange(idx, "description", e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                value={detail.qty}
                onChange={e => handleChange(idx, "qty", e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                value={detail.rate}
                onChange={e => handleChange(idx, "rate", e.target.value)}
              />
            </td>
            <td>{(detail.qty * detail.rate) || 0}</td>
            <td>
                <MdDelete 
                type="button"
                className="text-danger fs-4"
                onClick={() => handleRemove(idx)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  
</div>

        </>
    )
}

export default DetailForm