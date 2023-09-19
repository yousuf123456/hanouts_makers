import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import { VariantProps, cva } from "class-variance-authority"
import { cn } from '../utils/cn';
import { IconType } from 'react-icons';

const ButtonProps = cva(
    "font-text font-medium tracking-wide text-center rounded-sm transition-all active:scale-90",
    {
        variants : {
            variant : {
                default : "bg-themeBlue hover:bg-blue-600 text-white",
                outline : "bg-transparent border-2 border-themeBlue text-themeBlue hover:bg-themeBlue hover:text-white",
                ghost : "bg-slate-200 text-slate-500 hover:bg-slate-200 "
            },

            size : {
                sm : "text-xs py-1.5 px-2",
                md : "text-sm py-1.5 px-3",
                lg : "text-base py-2 px-4",
                xl : "text-lg py-2 px-5"
            },

            isLoading : {
                true : "opacity-60 hover:bg-themeBlue active:scale-100",
                false : "opacity-100 active:scale-90"
            },

            Disabled : {
                true : "opacity-60 hover:bg-themeBlue active:scale-100",
                false : "active:scale-90"
            }
        },

        defaultVariants : {
            variant : "default",
            size : "md",
            isLoading : false
        }
    }
)

interface ButtonProps extends 
ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof ButtonProps>
{ 
    icon? : IconType
}

export const Button: React.FC<ButtonProps> = ({
    icon,
    variant,
    size,
    isLoading,
    className,
    Disabled,
    ...props
}) => {
  return (
    <button 
        disabled={Disabled!} 
        className={cn(ButtonProps({ variant, size, isLoading, Disabled, className }))} 
        {...props} 
    />
  )
}
