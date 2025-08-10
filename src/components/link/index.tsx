interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

function Anchor({ href, children, ...props }: Props) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

Anchor.displayName = 'Anchor'

export default Anchor
