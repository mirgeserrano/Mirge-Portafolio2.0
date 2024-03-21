// //

// import { useEffect, useState } from "react";

// import axios from "axios";

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//  const [selectedValue, setSelectedValue] = useState("");
//   useEffect(() => {
//     const pragma = localStorage.getItem("userInfo");
//     const sinComillas = pragma.replace(/"/g, "");
//     console.log(sinComillas);

//     let config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: "http://192.168.1.51:6163/api/adm/customers/",
//       headers: {
//         Pragma: sinComillas,
//       },
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         setClients(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);

//   };
//   const resultadoSeleccionado = clients.filter((client) =>
//     client.descrip.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   // const filteredClients = clients.filter((client) =>
//   //   client.descrip.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Buscar cliente..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />

//       <ul>
//         {resultadoSeleccionado.map((client) => (
//           <li key={client.id}>{client.descrip}</li>
//         ))}
//       </ul>
//       <p>Resultado seleccionado: {resultadoSeleccionado.toString()}</p>
//     </div>
//   );
// };

// export default ClientList;

import React, { useEffect, useState } from "react";

import { Search } from "../assets";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    const pragma = localStorage.getItem("userInfo");
    const sinComillas = pragma.replace(/"/g, "");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://192.168.1.51:6163/api/adm/customers/",
      headers: {
        Pragma: sinComillas,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClientClick = (clientId) => {
    const selected = clients.find((client) => client.id === clientId);
    setSelectedClient(selected);
  };

  const filteredClients = clients.filter((client) =>
    client.codclie.toLowerCase().includes(searchTerm.toLowerCase() || "")
  );

  return (
    <div>
      <div className="flex items-center  h-8 w-1/2 border border-gray-700 rounded  py-2 rounded-lgborder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <Search />
        <input
          type="text"
          className=" h-4 border border-transparent rounded focus:border-transparent focus:outline-none focus:ring-0"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar cliente"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo electrónico</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id} onClick={() => handleClientClick(client.id)}>
              <td>{client.codclie}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClient && (
        <div>
          <h2>Datos del cliente</h2>
          <p>Nombre: {selectedClient.codclie}</p>
          <p>Correo electrónico: {selectedClient.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
