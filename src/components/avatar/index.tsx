import { cn } from '@/helpers/utils'
import { FaRegUser } from 'react-icons/fa6'
import type { User } from '@/helpers/types'
import { getUserInitials } from './utils'

interface AvatarProps extends User {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'circle' | 'square'
    className?: string
}

function Avatar({ avatar, firstName, lastName, size = 'md', variant = 'circle', className }: AvatarProps) {
    const initials = getUserInitials(firstName, lastName)
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
    }

    const variantClasses = {
        circle: 'rounded-full',
        square: 'rounded-md',
    }

    return <div className={cn('flex items-center justify-center', sizeClasses[size], variantClasses[variant], className)}>
        {
            avatar && (
                <img src={avatar} alt={initials} className="w-full h-full object-cover" />
            )
        }
        {!avatar && initials && (
            <span className="text-sm font-medium">{initials}</span>
        )}
        {!avatar && !initials && (
            <FaRegUser className="w-full h-full text-muted-foreground" />
        )}
    </div>
}

Avatar.displayName = 'Avatar'

Avatar.VARIANTS = {
    circle: 'circle',
    square: 'square',
} as const

Avatar.SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const

export default Avatar