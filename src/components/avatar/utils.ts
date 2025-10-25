export const getUserInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return ''
    if (!firstName) return lastName?.charAt(0).toUpperCase()
    if (!lastName) return firstName.charAt(0).toUpperCase()
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}