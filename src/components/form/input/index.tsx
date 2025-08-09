import React, { useId, useState } from 'react'

import { cn } from '@/helpers/utils'
import { InputContext } from './context'
import Error from './Error'
import Field from './Field'
import Icon from './Icon'
import Label from './Label'
import Group from './Group'
import Description from './Description'
import './input.css'

interface Props {
  id?: string
  className?: string
  children?: React.ReactNode
}

function Input({ className, children, id }: Props) {
  const _id = useId()
  const inputId = id ?? _id
  const [error, setError] = useState<string | undefined>(undefined)
  return (
    <InputContext.Provider value={{ id: inputId, error, setError }}>
      <div className={cn('group', className)}>{children}</div>
    </InputContext.Provider>
  )
}

Input.Field = Field
Input.Error = Error
Input.Icon = Icon
Input.Label = Label
Input.Group = Group
Input.Description = Description

Input.displayName = 'Input'

export default Input
