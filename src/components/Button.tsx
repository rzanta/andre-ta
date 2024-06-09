import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps, cva } from '@albertojrigail/class-variance-authority';

const buttonStyles = cva(["transition-colors"],{
  variants: {
    variant: {
      default: ["bg-primary", "hover:bg-primary-dark"],
      ghost: ["hover:opacity-50"],
      success: ["bg-success", "hover:bg-green"],
      darkSuccess: ["bg-dark-green", "hover:opacity-50"],
      danger: ["bg-danger", "hover:bg-light-red"],
      secondary: ["bg-secondary", "hover:bg-gray-600"],
      none: ["bg-transparent", "hover:bg-transparent"],
    },
    size: {
      default: ["px-9", "py-2", "text-white text-xl", "font-semibold"],
      icon: [
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "p-1",
        "flex-1"
      ],
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

export default function Button({ variant, size, className, type,...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  )
}