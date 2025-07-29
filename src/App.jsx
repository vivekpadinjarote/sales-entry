import { useEffect, useRef, useState } from "react";
import "./App.css";
import HeaderForm from "./features/header/headerForm";
import DetailForm from "./features/detail/detailForm";
import ButtonList from "./components/buttonList";
import VoucherPreview from "./components/VoucherPreview";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./formSchema/formSchema";

function App() {
  const header = useSelector((state) => state.header);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: header,
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    reset(header);
  }, [header.resetAt, reset]);

  const handlePrint = () => {
    setShowPreview(true);
  };

  useEffect(() => {
    if (showPreview) {
      const timeout = setTimeout(() => {
        window.print();
        setShowPreview(false); // hide again after print
      }, 100); // delay to allow render

      return () => clearTimeout(timeout);
    }
  }, [showPreview]);

  return (
    <>
      <div className="super-container">
        <ButtonList handleFormSave={handleSubmit} handlePrint={handlePrint} />
        <HeaderForm register={register} errors={errors} header={header} />
        <hr />
        <DetailForm />

        {showPreview && (
          <div className="d-print-block d-none d-lg-block">
            <VoucherPreview />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
