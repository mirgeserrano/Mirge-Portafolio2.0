import React from "react";

const InvoiceCostumerInfo = (prop) => {
  let {
    codCustomer,
    setCodCustomer,
    handleOpenModal,
    customerName,
    setCustomerName,
    customerType,
    setCustomerType,
    customerTlf,
    setCustomerTlf,
    addresCustomer,
    setAddresCustomer,
    customerEmail,
    setCustomerEmail,
    loading,
  } = prop;
  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="relative w-full  ">
            <input
              type="text"
              name="codCustomer"
              id="codCustomer"
              className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="Cedula"
              required
              value={codCustomer}
              onChange={(event) => setCodCustomer(event.target.value)}
              onClick={handleOpenModal}
              disabled={loading}
            />
            {/* <SelectCustomer
        value={codCustomer}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      /> */}
          </div>

          <div className="relative w-full col-start-2 row-start-1">
            <input
              type="text"
              name="customerName"
              id="customerName"
              className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="Cliente"
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
          <input
            required
            className={`block p-2.5 w-full  text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder="Tipo de precio "
            type="text"
            name="customerType"
            id="customerType"
            value={customerType}
            onChange={(event) => setCustomerType(event.target.value)}
            disabled={loading}
          />

          <input
            required
            className={`block p-2.5 w-full text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder="Telefono"
            type="tel"
            name="customerTlf"
            id="customerTlf"
            value={customerTlf}
            onChange={(event) => setCustomerTlf(event.target.value)}
            disabled={loading}
          />
        </div>
        <div className=" flex flex-col gap-4 p-2">
          <input
            required
            className={`block w-fulltext-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder="Direccion"
            type="text"
            name="addresCustomer"
            id="addresCustomer"
            value={addresCustomer}
            onChange={(event) => setAddresCustomer(event.target.value)}
            disabled={loading}
          />

          <input
            required
            className={`block w-full text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500
           ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            placeholder="Correo"
            type="email"
            name="customerEmail"
            id="customerEmail"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

const MemoizedInvoiceTable = React.memo(InvoiceCostumerInfo);

export default MemoizedInvoiceTable;
