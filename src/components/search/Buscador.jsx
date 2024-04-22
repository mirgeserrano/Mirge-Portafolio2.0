// import { useEffect, useState } from "react";
import useCustomerStore from "../../hooks/useCustomerStore";
//import { useDispatch } from "react-redux";
import { SearchBar } from "../SearchBar";
import { useState } from "react";
import { useEffect } from "react";

export const Buscador = () => {
 // const dispatch = useDispatch();
  const { getCustomes } = useCustomerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomes();
        setFilteredData(data); // Actualiza el estado con los datos de los clientes
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filterData = () => {
    // Realiza la lógica de filtrado aquí
    // Actualiza el estado filteredData con los datos filtrados
  };

  // Usa el componente SearchBar y pasa la función filterData como prop
  return (
    <div>
      <SearchBar filterFunction={setSearchTerm} />
      {/* Renderiza los resultados filtrados aquí */}
    </div>
  );
};
