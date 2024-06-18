import InvoiceItem from "./InvoiceItem"



const InvoiceTable = ({ items, loading, deleteItemHandler, edtiItemHandler}) => {
  return (
    <div>  <table className="w-3/2 p-2 text-left">
    <thead>
      <tr className=" w-3/2 border-b border-gray-900/10 text-sm md:text-base">
        <th>Codigo</th>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Alícuota I.V.A</th>
        <th>Total</th>
        <th className="text-center">ACCION</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <InvoiceItem
          key={index}
          id={item.id}
          codItem={item.codItem}
          descrp={item.descrp}
          mtotax={item.imp}
          qty={item.unidades}
          price={item.precio}
          isloading={loading}
          onDeleteItem={deleteItemHandler}
          onEdtiItem={edtiItemHandler}
        />
      ))}
    </tbody>
  </table>
  </div>
  )
}

export default InvoiceTable