import cn from 'classnames';
import Link from 'next/link';
import type { VariableFC } from 'xenopomp-essentials';

import type { LogoProps } from './Logo.props';
import type { LogoVariants } from './Logo.variants';
import { logoVariantsVariants } from './Logo.variants';
import LogoDefault from './icons/default';
import LogoShort from './icons/short';

/**
 * App`s logo component. Contains link to root
 * page (can be overwritten).
 * @constructor
 */
export const Logo: VariableFC<
  typeof Link,
  LogoProps & LogoVariants,
  'children' | 'href'
> = ({ href = '/', className, variant, painting, ...props }) => {
  return (
    <Link
      href={href}
      className={cn(className)}
      {...props}
    >
      {variant === 'long' || !variant ? (
        <LogoDefault
          className={cn(
            logoVariantsVariants({ variant, painting }),
            'h-[16px]',
          )}
          style={{
            aspectRatio: 133 / 24,
          }}
        />
      ) : (
        <LogoShort
          className={cn(
            logoVariantsVariants({ variant, painting }),
            'h-[20px]',
          )}
          style={{
            aspectRatio: 87 / 25,
          }}
        />
      )}
    </Link>
  );
};
