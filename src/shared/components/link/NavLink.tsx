import React, { Ref } from 'react'
import { NavLink as NavLinkDefault, NavLinkProps } from 'react-router-dom';


export const NavLink = React.forwardRef(({...props}: NavLinkProps, ref: Ref<HTMLAnchorElement> | undefined ) => (
  <NavLinkDefault
    ref={ref}
    {...props}
    className={({isActive}) => `${props.className} ${isActive ? 'active' : ''}` }
  />
));
