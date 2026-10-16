import type {InputHTMLAttributes} from 'react';

export function zohoCheck(checktype:'c1'|'c5'): InputHTMLAttributes<HTMLInputElement>{
  return {checktype} as InputHTMLAttributes<HTMLInputElement>;
}
