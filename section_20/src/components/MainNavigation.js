import { Link } from "react-router-dom"

const mainNavigation = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default mainNavigation