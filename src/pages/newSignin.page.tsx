import { useActiveUser } from '@/contexts/ActiveUserContext';

const NewSignin = () => {
  const user = useActiveUser();

  return <div>signed in as : {user?.username}</div>;
};

export default NewSignin;
