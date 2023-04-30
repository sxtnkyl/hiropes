import { ListProjectsQuery, Project } from '@/API';
import { GraphQLQuery } from '@aws-amplify/api';
import { AmplifyUser } from '@aws-amplify/ui';
import { API, Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as queries from '../graphql/queries';

type HiropesUser = Partial<AmplifyUser> | null;
interface ActiveUserProps {
  user: HiropesUser;
  projects?: Project[];
}
const ActiveUserContext = createContext<ActiveUserProps>({} as ActiveUserProps);
export const useActiveUser = () => useContext(ActiveUserContext);

export const ActiveUserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [signedInUser, setSignedInUser] = useState<ActiveUserProps>({
    user: null,
  });

  /** auth listener */
  useEffect(() => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return router.push('/profile');
        case 'signOut':
          return setSignedInUser({ user: null });
      }
    });

    const signedInUserSetter = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setSignedInUser(userData);
      } catch (err) {
        setSignedInUser({ user: null });
      }
    };
    signedInUserSetter();
  }, [router]);

  /** projects */
  useEffect(() => {
    if (!signedInUser.projects) {
      const userProjects = async () => {
        const { data } = await API.graphql<GraphQLQuery<ListProjectsQuery>>({
          query: queries.listProjects,
        });
        if (data?.listProjects?.items) {
          const projects = data?.listProjects?.items as Project[];
          setSignedInUser((prev) => ({
            ...prev,
            projects,
          }));
        }
      };

      userProjects();
    }
  }, [signedInUser.projects]);

  return (
    <ActiveUserContext.Provider value={signedInUser}>
      {children}
    </ActiveUserContext.Provider>
  );
};
