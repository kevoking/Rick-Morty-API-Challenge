"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

/**
 * state management using react inbuilt context api
 * selectedLocationId: this is a location id used to filter characters by location
 * selectedLocationName: to display the currently selected loaction name
 * showLocationDrawer: on small screens the location section is hidden and shows as a drawer if @this value is true
 */
interface CharacterListContextProps {
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  selectedLocationName: string;
  setSelectedLocationName: (name: string) => void;
  showLocationDrawer: boolean;
  setShowLocationDrawer: (show: boolean) => void;
}

const CharacterListContext = createContext<CharacterListContextProps>(
  {} as CharacterListContextProps,
);

export const CharacterListProvider: FC<PropsWithChildren> = function ({ children }) {

  const [selectedLocationId, setSelectedLocationId] = useState("")
  const [selectedLocationName, setSelectedLocationName] = useState("")
  const [showLocationDrawer, setShowLocationDrawer] = useState(false)

  return (
    <CharacterListContext.Provider
      value={{
        selectedLocationId,
        setSelectedLocationId,
        selectedLocationName,
        setSelectedLocationName,
        showLocationDrawer,
        setShowLocationDrawer
      }}
    >
      {children}
    </CharacterListContext.Provider>
  );
};

export function useCharacterListContext(): CharacterListContextProps {
  const context = useContext(CharacterListContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useCharacterListContext should be used within the CharacterListContext provider!",
    );
  }

  return context;
}