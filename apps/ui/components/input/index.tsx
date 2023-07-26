import React, { InputHTMLAttributes, ChangeEvent, forwardRef } from 'react';
import cn from 'classnames';
import Label from '../label';
import InputError from '../inputError';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  labelClassName?: string;
  error?: {
    [x: string]: any;
  };
}
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, children, label, error, type, ...rest } = props;

  const containerClassName = cn({
    block: type !== 'checkbox',
    'flex flex-grow': type === 'checkbox',
  });

  const labelClassName = cn(rest.labelClassName, {
    'flex-grow': type === 'checkbox',
  });

  const inputClassNameToUse = cn(
    className,
    'my-2 py-2 px-3 border block shadow-sm border-gravel rounded-lg w-full focus:border-sea',
    className,
    { 'mb-0': !!error }
  );

  return (
    <Label className={containerClassName}>
      {label && <span className={labelClassName}>{label}</span>}
      <input ref={ref} type={type} className={inputClassNameToUse} {...rest} />
      {error && <InputError error={error} label={label} />}
    </Label>
  );
});

Input.displayName = 'Input';

export default Input;
