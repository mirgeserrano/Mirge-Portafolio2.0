import React from "react";

function InvoiceTotals(prop) {
  const {
    refSubtotal = 0,
    refDescuento = 0,
    refBaseIm = 0,
    refIva = 0,
    refTotal = 0,
    totalMontoIgtf = 0,
    refBaseIgtf = 0,
    refTotalAPagar = 0,
    subTotal = 0,
    discountRate = 0,
    subtotalImponible = 0,
    subtotalConIVA = 0,
    total = 0,
    totalMontoIgtfbs = 0,
    totalAPagar = 0,
    baseIgtf = 0,
  } = prop;
  return (
    <div className="flex flex-col p-2">
      {/* Dolares-------------------------------------------------------------------- */}

      <div className="p-4">
        <div className="flex w-full justify-between ">
          <span className="font-bold">Subtotal:</span>
          <span>$ {refSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Descuento:</span>
          <span>$ {refDescuento.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Base Imponible(G):</span>
          <span>$ {refBaseIm.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">IVA 16%:</span>
          <span>$ {refIva.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Total:</span>
          <span>$ {refTotal.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Base imponible IGTF 3% :</span>
          <span>$ {totalMontoIgtf.toFixed(2)} </span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">IGTF 3% :</span>
          <span>$ {refBaseIgtf.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between bg-[#BFE1D5] shadow-lg p-2 rounded-lg ">
          <span className="font-bold">Total a pagar:</span>
          <span className="font-bold">$ {refTotalAPagar.toFixed(2)}</span>
        </div>
      </div>
      {/* Bolivares-------------------------------------------------------------------- */}
      <div className=" bg-white p-4 rounded-lg ">
        <div className="flex w-full justify-between ">
          <span className="font-bold">Subtotal:</span>
          <span>Bs {subTotal.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Descuento:</span>
          <span>Bs {discountRate.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Base Imponible(G):</span>
          <span>Bs {subtotalImponible.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">IVA 16%:</span>
          <span>Bs {subtotalConIVA.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Total:</span>
          <span>Bs {total.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">Base Imponible IGTF 3% :</span>
          <span>Bs {totalMontoIgtfbs.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between ">
          <span className="font-bold">IGTF 3% :</span>
          <span>Bs {baseIgtf.toFixed(2)} </span>
        </div>
        <div className="flex w-full justify-between bg-gray-300 shadow-lg p-2 rounded-lg ">
          <span className="font-bold">Total a pagar:</span>
          <span className="font-bold  ">Bs {totalAPagar.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}


const MemoizedInvoiceTotals = React.memo(InvoiceTotals);

export default MemoizedInvoiceTotals ;
    {/* <MemoizedInvoiceTotals
        refSubtotal={refSubtotal}
        refDescuento={refDescueto}
        refBaseIm={refBaseIm}
        refIva={refIva}
        refTotal={refTotal}
        totalMontoIgtf={totalMontoIgtf}
        refBaseIgtf={refBaseIgtf}
        refTotalAPagar={refTotalAPagar}
        subTotal={subTotal}
        discountRate={discountRate}
        subtotalImponible={subtotalImponible}
        subtotalConIVA={subtotalConIVA}
        total={total}
        totalMontoIgtfbs={totalMontoIgtfbs}
        baseIgtf={baseIgtf}
      /> */}
