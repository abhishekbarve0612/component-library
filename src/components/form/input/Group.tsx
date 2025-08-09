import React from 'react'
import { cn } from '@/helpers/utils'
import type { IconProps } from './Icon'

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

function Group({ children, className, ...props }: GroupProps) {
  const childArray = React.Children.toArray(children)

  // Find the index of the field
  const fieldIndex = childArray.findIndex(
    (child) =>
      React.isValidElement(child) &&
      (child.type as unknown as { displayName: string }).displayName === 'Input.Field'
  )

  const leftIcons: React.ReactNode[] = []
  const rightIcons: React.ReactNode[] = []
  let fieldElement: React.ReactNode = null

  childArray.forEach((child, index) => {
    if (!React.isValidElement(child)) return

    const typeName = (child.type as unknown as { displayName: string }).displayName

    if (typeName === 'Input.Field') {
      fieldElement = child
    } else if (typeName === 'Input.Icon') {
      const explicitPos = (child.props as { position?: 'left' | 'right' }).position
      const autoPos = index < fieldIndex ? 'left' : 'right'
      const position = explicitPos || autoPos

      if (position === 'left') {
        leftIcons.push(child)
      } else {
        rightIcons.push(child)
      }
    }
  })

  // Inject absolute positions for each icon
  const renderIcons = (icons: React.ReactNode[], side: 'left' | 'right'): React.ReactNode[] => {
    return icons.map((icon, i) =>
      React.cloneElement(
        icon as React.ReactElement,
        {
          position: side as 'left' | 'right',
          style: {
            ...(icon as React.ReactElement<{ style?: React.CSSProperties }>).props.style,
            [side]: `${0.75 + i * 2}rem`, // 0.75rem = left-3/right-3, +2rem each additional
          },
        } as IconProps
      )
    )
  }
  const paddingLeft = leftIcons.length > 0 ? `${0.75 + leftIcons.length * 2}rem` : undefined
  const paddingRight = rightIcons.length > 0 ? `${0.75 + rightIcons.length * 2}rem` : undefined
  
  const adjustedField =
    React.isValidElement(fieldElement) &&
    React.cloneElement(fieldElement, {
      className: (fieldElement as React.ReactElement<{ className?: string }>).props.className,
      style: {
        ...((fieldElement as React.ReactElement<{ style?: React.CSSProperties }>).props.style || {}),
        paddingLeft,
        paddingRight,
      }
    })


  return (
    <div className={cn('relative w-full', className)} {...props}>
      {renderIcons(leftIcons, 'left')}
      {adjustedField}
      {renderIcons(rightIcons, 'right')}
    </div>
  )
}

Group.displayName = 'Input.Group'

export default Group
