import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface GlobalSideNavProps {
  isGlobalSideNavOpen: boolean;
  setIsGlobalSideNavOpen: Dispatch<SetStateAction<boolean>>;
}
const GlobalSideNavContext = createContext<GlobalSideNavProps>(
  {} as GlobalSideNavProps
);
export const useGlobalSideNav = () => useContext(GlobalSideNavContext);

export const GlobalSideNavProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isGlobalSideNavOpen, setIsGlobalSideNavOpen] = useState(false);

  return (
    <GlobalSideNavContext.Provider
      value={{ isGlobalSideNavOpen, setIsGlobalSideNavOpen }}
    >
      {children}
    </GlobalSideNavContext.Provider>
  );
};
