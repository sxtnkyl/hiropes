import { Typography } from '@mui/material';
import Link from 'next/link';

const HomeCreateContent = () => {
  return (
    <>
      <Link href="/create">Go To</Link>
      <Typography variant="h1">Create New Workout</Typography>
    </>
  );
};
export default HomeCreateContent;
