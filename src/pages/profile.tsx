import { useActiveUser } from '@/contexts/ActiveUserContext';
import { useRouter } from 'next/router';

const Profile = () => {
  const user = useActiveUser();
  const router = useRouter();

  const signoutHandler = () => {
    if (user?.signOut) {
      user?.signOut();
      router.push('/');
    }
  };

  return (
    <div>
      <div>profile page</div>
      <div>{user?.username}</div>
      <div>
        <button onClick={signoutHandler}>Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
