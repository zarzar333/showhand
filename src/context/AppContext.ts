import { createContext } from 'react'
interface AppContext {
  selectedTypes: string[];
  setSelectedTypes: (selectedTypes: string[]) => void;
}

export const AppContext = createContext<AppContext>({
  selectedTypes: [],
  setSelectedTypes: (_) => {}
});