import React, { ForwardedRef, PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import MuiLink from '@material-ui/core/Link';
import { linkMui, nextCompose } from '../../types/components';


const NextComposed: React.FC<nextCompose> = React.forwardRef(function NextComposed(props, ref: ForwardedRef<HTMLAnchorElement>) {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

/**
 * A styled version of the Next.js Link component
 * https://nextjs.org/docs/#with-link
 */
const Link: React.FC<linkMui> = (props) => {
  const {
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed href={innerRef} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} {...other} />;
}

export default React.forwardRef((props:PropsWithChildren<any>, ref: ForwardedRef<string>) => <Link {...props} innerRef={ref}/>);
