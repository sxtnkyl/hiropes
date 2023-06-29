import { ListProjectsQuery, Project } from '@/API';
import { GraphQLQuery } from '@aws-amplify/api';
import { AmplifyUser } from '@aws-amplify/ui';
import { API, Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as queries from '../graphql/queries';

type HiropesUser = Partial<AmplifyUser> | undefined;
interface ActiveUserContextProps {
  signedInUser?: HiropesUser;
  setSignedInUser: Dispatch<SetStateAction<HiropesUser>>;
  projects?: Project[];
  setProjects: Dispatch<SetStateAction<Project[] | undefined>>;
  fetchAndUpdateProjects: () => Promise<void>;
}
const ActiveUserContext = createContext<ActiveUserContextProps>(
  {} as ActiveUserContextProps
);
export const useActiveUser = () => useContext(ActiveUserContext);

export const ActiveUserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [signedInUser, setSignedInUser] = useState<HiropesUser>();
  const [projects, setProjects] = useState<Project[]>();

  /** auth listener */
  useEffect(() => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return router.push('/profile');
        case 'signOut':
          return () => {
            router.push('/');
            setSignedInUser(undefined);
          };
      }
    });

    const signedInUserSetter = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setSignedInUser(userData);
      } catch (err) {
        setSignedInUser(undefined);
      }
    };
    signedInUserSetter();
  }, [router]);

  /** projects */
  useEffect(() => {
    if (signedInUser && !projects) {
      fetchAndUpdateProjects();
    }
  }, [projects, signedInUser]);

  const fetchAndUpdateProjects = async () => {
    const { data } = await API.graphql<GraphQLQuery<ListProjectsQuery>>({
      query: queries.listProjects,
    });
    /** type assertion needed as response is (Project | null)[] */
    const projects = data?.listProjects?.items.filter(
      (proj) => proj !== null
    ) as Project[];
    setProjects(projects);
  };

  return (
    <ActiveUserContext.Provider
      value={{
        signedInUser,
        setSignedInUser,
        projects,
        setProjects,
        fetchAndUpdateProjects,
      }}
    >
      {children}
    </ActiveUserContext.Provider>
  );
};
