import React, {createContext, useContext, useState } from "react";

type IDashboardState = {
  chat: boolean,
  cart: boolean,
  userProfile: boolean,
  notification: boolean,
  activeMenu: boolean,
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
  screenSize: number | undefined,
  setScreenSize: React.Dispatch<React.SetStateAction<number | undefined>>
}

const initialDashboardState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  activeMenu: true,
  setActiveMenu: () => {},
  screenSize: undefined,
  setScreenSize: () => {},
}

const DashboardStateContext = createContext<IDashboardState>(initialDashboardState);

export const ContextProvider = ({ children } : {children: React.ReactNode}) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  const value = {
    chat: initialDashboardState.chat,
    cart: initialDashboardState.cart,
    userProfile: initialDashboardState.userProfile,
    notification: initialDashboardState.notification,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize
  }

  return (
    <DashboardStateContext.Provider value={value}>
      {children}
    </DashboardStateContext.Provider>
  )
}

export const useStateContext = () => useContext(DashboardStateContext);