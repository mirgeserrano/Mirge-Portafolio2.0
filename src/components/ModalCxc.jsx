import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useCxcStore } from "../hooks";
import { useDispatch } from "react-redux";

export const ModalCxc = () => {
  const id = useParams();
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const { getAccountReceivable, putAccountReceivable } = useCxcStore();
  const [accountReceivable, setAccountReceivable] = useState([]);

  useEffect(() => {
    getAccountReceivable(id)
      .then((data) => {
        setAccountReceivable(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
console.log(accountReceivable);
  const invoiceFields = [
    { name: "codclie", label: "Cod Cliente" },
    { name: "numerod", label: "Documento" },
    { name: "monto", label: "Saldo" },
  ];
  
 const tableName = "cxc";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putAccountReceivable(data));
    
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <Modal
        fields={invoiceFields}
        data={accountReceivable}
        tableName={tableName}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </div>
  );
};

