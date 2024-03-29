"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

/**
 * context api to manage state for viewing charatcter details
 * selectedCharacterId: this is the id of the currently selected character
 * isCharacterDrawerCollapsed: show or hide the character details screen which shows as a drawer
 */
interface CharacterDrawerContextProps {
  selectedCharacterId: string;
  setSelectedCharacterId: (id: string) => void;
  isCharacterDrawerCollapsed: boolean;
  setCharacterDrawerCollapsed: (isOpen: boolean) => void;
}

const CharacterDrawerContext = createContext<CharacterDrawerContextProps>(
  {} as CharacterDrawerContextProps,
);

export const CharacterDrawerProvider: FC<PropsWithChildren> = function ({ children }) {

  const [isCharacterDrawerCollapsed, setCharacterDrawerCollapsed] = useState(true);
  const [selectedCharacterId, setSelectedCharacterId] = useState("");

  return (
    <CharacterDrawerContext.Provider
      value={{
        selectedCharacterId,
        setSelectedCharacterId,
        isCharacterDrawerCollapsed,
        setCharacterDrawerCollapsed,
      }}
    >
      {children}
    </CharacterDrawerContext.Provider>
  );
};

export function useCharacterDrawerContext(): CharacterDrawerContextProps {
  const context = useContext(CharacterDrawerContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useCharacterDrawerContext should be used within the CharacterDrawerContext provider!",
    );
  }

  return context;
}