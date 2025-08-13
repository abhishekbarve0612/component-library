import React from 'react'
import { cn } from '@/helpers/utils'
import type { InputGroupProps } from './types'

function Group({ children, className, ...props }: InputGroupProps) {
  // Convert children to array for easier processing
  const childArray = React.Children.toArray(children)

  // Find Field component position to determine automatic icon positioning
  const fieldIndex = childArray.findIndex(
    (child) =>
      React.isValidElement(child) &&
      (child.type as unknown as { displayName: string }).displayName === 'Input.Field'
  )

  // Separate children into categories
  const leftIcons: React.ReactNode[] = []
  const rightIcons: React.ReactNode[] = []
  let fieldElement: React.ReactNode = null

  // Process each child and categorize by type and position
  childArray.forEach((child, index) => {
    if (!React.isValidElement(child)) return

    const displayName = (child.type as unknown as { displayName: string }).displayName

    if (displayName === 'Input.Field') {
      fieldElement = child
    } else if (displayName === 'Input.Icon') {
      // Determine position: explicit prop or auto-position based on order
      const explicitPosition = (child.props as { position?: 'left' | 'right' }).position
      const autoPosition = index < fieldIndex ? 'left' : 'right'
      const finalPosition = explicitPosition || autoPosition

      if (finalPosition === 'left') {
        leftIcons.push(child)
      } else {
        rightIcons.push(child)
      }
    }
  })

  return (
    <div className={cn('input-group', className)} {...props}>
      {/* Left icons - render only if present */}
      {leftIcons.length > 0 && <div className="input-group-left-icons">{leftIcons}</div>}

      {/* Input field - takes remaining space */}
      {fieldElement && <div className="input-group-field">{fieldElement}</div>}

      {/* Right icons - render only if present */}
      {rightIcons.length > 0 && <div className="input-group-right-icons">{rightIcons}</div>}
    </div>
  )
}

Group.displayName = 'Input.Group'

export default Group
