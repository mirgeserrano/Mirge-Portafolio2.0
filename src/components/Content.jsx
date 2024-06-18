import React from 'react'

export const Content = ({name}) => {
  return (
    <div>
      <div className="flex place-content-center h-32  bg-[#8FD3F7] shadow-lg p-6 rounded-lg">
        <div >No hay {name} disponibles </div>
      </div>
    </div>
  );
};
 export default Content