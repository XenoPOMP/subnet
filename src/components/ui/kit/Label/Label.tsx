import cn from 'classnames';
import type { LucideIcon } from 'lucide-react';
import type { VariableFC } from 'xenopomp-essentials';

// eslint-disable-next-line jsdoc/require-jsdoc
export const Label: VariableFC<'div', Props> = ({
  icon: Icon,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-start gap-[1.0rem]',
        'text-shallow-light',
        className,
      )}
      {...props}
    >
      {!!Icon && (
        <Icon
          size='1.6rem'
          color='currentColor'
          className={cn('mt-[0.1rem]')}
        />
      )}
      <div className={cn('text-[1.4rem]')}>{children}</div>
    </div>
  );
};

interface Props {
  icon?: LucideIcon;
}
