import { createContext } from 'react'

interface AppContext {
  selectedTypes: string[];
  setSelectedTypes: (selectedTypes: string[]) => void;
  selectedNearbyId?: number
  setSelectedNearbyId: (nearby: number) => void; 
}


export const AppContext = createContext<AppContext>({
  selectedTypes: [],
  setSelectedTypes: (_) => {},
  setSelectedNearbyId: (_) => {},
});