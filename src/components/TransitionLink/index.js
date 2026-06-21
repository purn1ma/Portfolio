import { useLocation, useNavigate } from 'react-router-dom'

const TransitionLink = ({ to, className, children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = pathname === to

  const handleClick = (e) => {
    e.preventDefault()

    if (!document.startViewTransition) {
      navigate(to)
      return
    }

    const x = e.clientX
    const y = e.clientY
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      navigate(to)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className || ''} ${isActive ? 'active' : ''}`.trim()}
    >
      {children}
    </a>
  )
}

export default TransitionLink
