import { useDispatch, useSelector } from "react-redux"
import api from "../../api/api"
import { useEffect, useState } from "react";
import { setTotalAmount } from "../header/headerSlice";
import { addRow,removeRow, updateRow } from "./detailSlice";
import Select from 'react-select'

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

    
                console.log(items)

    const handleAdd = () => {
    dispatch(addRow({
      item_code: '',
      item_name: '',
      description: '',
      qty: '',
      rate: ''
    }));
  };

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
      color: state.isSelected ? "white" : "black", // text color
      backgroundColor: state.isSelected ? "#5981acff" : "white", // selected background
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
        <div>
            <h2>
                Detail Table
            </h2>

            <table>
                <thead>
                    <tr>
                        <th>Sl no</th>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Sub Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail,idx)=>(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>
                                <Select 
                                options={itemOptions}
                                value={itemOptions.find(opt => opt.value === detail.item_code ||null)}
                                onChange={e=> handleChange(idx,"item_code",e?.value)}
                                placeholder="Select"
                                isClearable
                                styles={selectStyle}
                                />
                            </td>
                            <td><input value={detail.item_name} readOnly /></td>
                            <td><input type="number" value={detail.qty} onChange={e=> handleChange(idx,"qty",e.target.value)} /></td>
                            <td><input type="number" value={detail.rate} onChange={e => handleChange(idx, "rate", e.target.value)} /></td>
                            <td>{(detail.qty * detail.rate) || 0}</td>
                            <td><button type="button" onClick={() => handleRemove(idx)}>❌</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={handleAdd}>+ Add Row</button>
        </div>
        </>
    )
}

export default DetailForm