import Link from "next/link"
import clsx from "clsx"

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
}

type Variant = "solid" | "outline"
type Color = "slate" | "blue" | "white"

const variantStyles: Record<Variant, Record<Color, string>> = {
  solid: {
    slate:
      "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-900",
    blue: "bg-blue-600 text-white hover:text-gray-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
    white:
      "bg-white text-gray-900 hover:bg-blue-50 active:bg-blue-200 active:text-gray-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-gray-200 text-gray-700 hover:text-gray-900 hover:ring-gray-300 active:bg-gray-100 active:text-gray-600 focus-visible:outline-blue-600 focus-visible:ring-gray-300",
    white:
      "ring-gray-700 text-white hover:ring-gray-500 active:ring-gray-700 active:text-gray-400 focus-visible:outline-white",
    blue: "",
  },
}

type ButtonProps = {
  variant?: Variant
  color?: Color
  type?: "button" | "submit" | "reset"
} & (
  | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
  | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
      href?: undefined
    })
)

export function Button({
  variant = "solid",
  color = "slate",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const combinedClass = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  )

  if (props.href) {
    return <Link {...props} className={combinedClass} />
  } else {
    // TODO: fix props for buttons
    const { href, ...buttonProps } = props
    // @ts-ignore
    return <button type={type} className={combinedClass} {...buttonProps} />
  }
}
