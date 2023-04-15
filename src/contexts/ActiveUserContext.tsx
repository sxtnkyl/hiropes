import { AmplifyUser } from '@aws-amplify/ui';
import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type HiropesUser = Partial<AmplifyUser> | null;
const ActiveUserContext = createContext<HiropesUser>(null);
export const useActiveUser = () => useContext(ActiveUserContext);

export const ActiveUserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [signedInUser, setSignedInUser] = useState<HiropesUser>(null);

  useEffect(() => {
    /** auth listener */
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return router.push('/profile');
        case 'signOut':
          return setSignedInUser(null);
      }
    });

    const signedInUserSetter = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setSignedInUser(userData);
      } catch (err) {
        setSignedInUser(null);
      }
    };
    signedInUserSetter();
  }, [router]);

  return (
    <ActiveUserContext.Provider value={signedInUser}>
      {children}
    </ActiveUserContext.Provider>
  );
};
