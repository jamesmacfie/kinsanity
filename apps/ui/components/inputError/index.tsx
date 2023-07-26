import React from 'react';
import cn from 'classnames';
interface Props {
  className?: string;
  error: {
    [x: string]: any;
  };
  label?: string;
}

const InputError = ({ error, className, ...props }: Props) => {
  const classes = cn(
    'ml-2 mt-1 mb-2 block text-red-500 text-sm font-light',
    className
  );
  const label = props.label ? props.label : 'This input';
  const { type } = error;

  if (type == 'required') {
    return <span className={classes}>{label} is required</span>;
  } else if (type == 'pattern') {
    return <span className={classes}>{label} is invalid</span>;
  } else if (type == 'minLength') {
    return <span className={classes}>{label} is too short</span>;
  } else if (type == 'maxLength') {
    return <span className={classes}>{label} is too long</span>;
  }

  return (
    <span className={classes}>{label} has an unexpected validation error</span>
  );
};

export default InputError;
