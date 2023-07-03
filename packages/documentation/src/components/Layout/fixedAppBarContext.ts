import { createContext, useContext } from 'voby';

type Setter = (fixedElevation: boolean) => void;

const context = createContext<Setter>(() => {
  // do nothing
});

export const { Provider } = context;

export function useFixedAppBarContext(): Setter {
  return useContext(context);
}
