import { useState, useEffect } from 'react'
import './App.css'
import HeaderForm from './features/header/headerForm'
import DetailForm from './features/detail/detailForm'
import ButtonList from './components/buttonList'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { setHeader } from "./features/header/headerSlice";
import schema from "./formSchema/formSchema"

function App() {
    const dispatch = useDispatch()
    const header = useSelector((state)=>state.header)
    const [save,setSave] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:header,
    })

    useEffect(()=>{
      reset(header);
    },[header,reset])

    const onSave = (data)=>{
        dispatch(setHeader({...data}));
        alert("Data Saved")
        setSave(!save)
        console.log(save)

    }

    

  return (
    <>
    <div className='super-container'>
      <ButtonList handleFormSave={handleSubmit(onSave)} toggleSave={save}  />
      <HeaderForm register={register} errors={errors} header={header}/>
      <hr/>
      <DetailForm />
    </div>
    </>
  )
}

export default App
