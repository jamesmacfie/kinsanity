import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import Label from '@ui/components/label';
import InputError from '@ui/components/inputError';
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  labelClassName?: string;
  error?: {
    [x: string]: any;
  };
}
const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
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
      <textarea ref={ref} className={inputClassNameToUse} {...rest} />
      {error && <InputError error={error} label={label} />}
    </Label>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
