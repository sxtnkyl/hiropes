import { useRouter } from 'next/router';

const TopNavbar = () => {
  const router = useRouter();

  return (
    <nav>
      <span
        onClick={() => {
          router.push('/profile');
        }}
      >
        profile
      </span>
    </nav>
  );
};

export default TopNavbar;
