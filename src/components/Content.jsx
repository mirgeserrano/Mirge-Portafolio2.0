import React from 'react'

export const Content = ({name}) => {
  return (
    <div>
      <div className="flex place-content-center h-32  bg-[#BFE1D5] shadow-lg p-6 rounded-lg">
        <div >No hay {name} disponibles </div>
      </div>
    </div>
  );
};
 export default Content