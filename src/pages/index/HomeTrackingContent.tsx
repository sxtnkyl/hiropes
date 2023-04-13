import { Typography } from '@mui/material';
import Link from 'next/link';

const HomeTrackingContent = () => {
  return (
    <>
      <Link href="/tracking">Go To</Link>
      <Typography variant="h1">Track Workout Progress</Typography>
    </>
  );
};
export default HomeTrackingContent;
