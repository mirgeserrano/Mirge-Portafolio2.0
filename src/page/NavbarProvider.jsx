import { createContext, useState } from 'react';

const NavbarContext = createContext();

function NavbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NavbarContext.Provider>
  );
}
