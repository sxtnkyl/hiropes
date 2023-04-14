import { LinkBaseProps, Link as MuiLink } from '@mui/material';
import Link, { LinkProps } from 'next/link';

/**
 * Mui Link as Next Link component
 * for Next routing and mui
 * ease of styling styling
 */
type MuiNextLinkProps = LinkProps & LinkBaseProps;

const MuiNextLink = ({ children, href, ...rest }: MuiNextLinkProps) => {
  return (
    <MuiLink href={href} component={Link} color="inherit" {...rest}>
      {children}
    </MuiLink>
  );
};

export default MuiNextLink;
