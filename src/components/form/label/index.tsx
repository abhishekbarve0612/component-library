import { cn } from '@/helpers/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn("block text-sm font-medium text-gray-700 dark:text-gray-300", className)} {...props}>
      {children}
    </label>
  );
}

export default Label;
