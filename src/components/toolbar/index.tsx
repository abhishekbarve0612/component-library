/**
 * <Toolbar>
  <Toolbar.Group>
    <Toolbar.Button
      icon={<BoldIcon />}
      tooltip="Bold (Ctrl+B)"
      onClick={() => format('bold')}
      active={isBold}
    />
    <Toolbar.Button
      icon={<ItalicIcon />}
      tooltip="Italic (Ctrl+I)"
      onClick={() => format('italic')}
      active={isItalic}
    />
  </Toolbar.Group>

  <Toolbar.Separator />

  <Toolbar.Group>
    <Toolbar.Button
      icon={<LinkIcon />}
      tooltip="Insert link"
      onClick={insertLink}
    />
  </Toolbar.Group>
</Toolbar>

 */

import { cn } from "@/helpers/utils"
import { tv } from 'tailwind-variants'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean
  children: React.ReactNode
  className?: string
  variant?: 'compact' | 'large' | 'minimal' | 'floating' | 'inline'
}

const toolbarVariants = tv({
  base: "flex items-center gap-2",
  variants: {
    vertical: {
      true: "flex-col",
    },
    variant: {
      compact: "gap-1",
      large: "gap-2",
      minimal: "gap-0.5",
      floating: "gap-2",
      inline: "gap-2",
    },
  },
  defaultVariants: {
    variant: "compact",
  },
})
function Toolbar({ children, vertical = false, variant = 'compact', className, ...props }: Props) {
  return (
    <div
      role="toolbar"
      className={cn(
        "flex items-center",
        vertical && "flex-col",
        toolbarVariants({ variant }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Toolbar.displayName = 'Toolbar'

export default Toolbar