import React from "react";

const Table = ({ data }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Edad</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.id}</td>
            <td className="border px-4 py-2">{item.nombre}</td>
            <td className="border px-4 py-2">{item.edad}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
