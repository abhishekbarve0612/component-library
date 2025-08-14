'use client'

import React, { useState, useCallback, forwardRef } from 'react'
import { cn } from '@/helpers/utils'
import type { RangeInputProps } from './types'
import { RANGE_INPUT_CLASSES, DEFAULT_PROPS } from './constants'

const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>(
  (
    {
      min = DEFAULT_PROPS.min,
      max = DEFAULT_PROPS.max,
      step = DEFAULT_PROPS.step,
      value,
      defaultValue,
      showValue = DEFAULT_PROPS.showValue,
      showLabels = DEFAULT_PROPS.showLabels,
      label,
      description,
      error,
      className,
      thumbClassName,
      trackClassName,
      rangeClassName,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? value ?? min)
    const currentValue = value !== undefined ? value : internalValue

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value)
        if (value === undefined) {
          setInternalValue(newValue)
        }
        onChange?.(e)
      },
      [onChange, value]
    )

    return (
      <div className={cn(RANGE_INPUT_CLASSES.container, className)}>
        {label && (
          <label className={RANGE_INPUT_CLASSES.label}>
            {label}
            {showValue && (
              <span className={cn(RANGE_INPUT_CLASSES.valueDisplay, 'ml-2')}>{currentValue}</span>
            )}
          </label>
        )}

        {description && <p className={RANGE_INPUT_CLASSES.description}>{description}</p>}

        <div className={cn(RANGE_INPUT_CLASSES.wrapper, rangeClassName)}>
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            className={cn(RANGE_INPUT_CLASSES.input, trackClassName, thumbClassName)}
            {...props}
          />
        </div>

        {showLabels && (
          <div className={RANGE_INPUT_CLASSES.minMaxLabels}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}

        {error && (
          <p className={RANGE_INPUT_CLASSES.error} role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

RangeInput.displayName = 'RangeInput'

export default RangeInput
