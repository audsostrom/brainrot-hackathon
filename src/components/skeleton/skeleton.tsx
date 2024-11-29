// from shadcdn: https://ui.shadcn.com/docs/components/skeleton
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-700 ${className}`}
      {...props}
    />
  )
}

export { Skeleton };
