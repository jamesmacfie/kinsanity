import React, { ReactNode, SelectHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import Label from '@ui/components/label';
import InputError from '@ui/components/inputError';
interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: ReactNode;
  label?: string;
  labelClassName?: string;
  error?: {
    [x: string]: any;
  };
}
const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { className, children, label, error, labelClassName, ...rest } = props;

  const inputClassNameToUse = cn(
    className,
    'my-2 py-2 px-3 border block shadow-sm border-gravel rounded-lg w-full focus:border-sea',
    className,
    { 'mb-0': !!error }
  );

  return (
    <Label>
      {label && <span className={labelClassName}>{label}</span>}
      <select ref={ref} className={inputClassNameToUse}>
        {children}
      </select>
      {error && <InputError error={error} label={label} />}
    </Label>
  );
});

Select.displayName = 'Select';

export default Select;
