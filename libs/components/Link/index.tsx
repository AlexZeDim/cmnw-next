import React, { ForwardedRef, PropsWithChildren } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import MuiLink from '@material-ui/core/Link';

type Props = {
  as: string,
  href: string,
  prefetch: boolean
}

const NextComposed: React.FC<Props> = React.forwardRef(function NextComposed(props, ref: ForwardedRef<HTMLAnchorElement>) {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

/* TODO
  type Link = {
  activeClassName: string,
  as: string,
  className: string,
  href: string,
  innerRef: any, //PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  naked: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  prefetch: boolean,
}
*/

/**
 * A styled version of the Next.js Link component
 * https://nextjs.org/docs/#with-link
 */
function Link(props) {
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
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} {...other} />;
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default React.forwardRef((props:PropsWithChildren<any>, ref: ForwardedRef<string>) => <Link {...props} innerRef={ref}/>);
