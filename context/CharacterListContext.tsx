"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

interface CharacterListContextProps {
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  selectedLocationName: string;
  setSelectedLocationName: (name: string) => void;
}

const CharacterListContext = createContext<CharacterListContextProps>(
  {} as CharacterListContextProps,
);

export const CharacterListProvider: FC<PropsWithChildren> = function ({ children }) {

  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("")

  return (
    <CharacterListContext.Provider
      value={{
        selectedLocationId,
        setSelectedLocationId,
        selectedLocationName,
        setSelectedLocationName,
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