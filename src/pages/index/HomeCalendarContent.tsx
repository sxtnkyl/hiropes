import { Typography } from '@mui/material';
import Link from 'next/link';

const HomeCalendarContent = () => {
  return (
    <>
      <Link href="/calendar">Go To</Link>
      <Typography variant="h1">Check Calendar Frequency</Typography>
    </>
  );
};
export default HomeCalendarContent;
