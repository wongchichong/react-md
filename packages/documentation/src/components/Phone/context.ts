import type { ReactNode } from 'voby';
import { createContext, useContext } from 'voby';

interface PhoneContextType {
  id: string;
  title: ReactNode;
  closePhone: () => void;
}

export const PhoneContext = createContext<PhoneContextType>({
  id: "",
  title: "Example",
  closePhone: () => {
    // do nothing
  },
});

export function usePhoneContext(): PhoneContextType {
  return useContext(PhoneContext);
}
