import { Fragment } from "react"
import { Link, Outlet } from "react-router-dom"

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss'
const Navigation = () => {

  // <Outlet/> dictates where to render children routes 
  
  // <Fragment > Used when you don’t want to render anything, 
  // instead of a wrapping <div>
  
  return(
    <Fragment >
    
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrwnLogo className="logo"/>
        </Link>
        
        <div className="nav-links-container">
          <Link className="nav-link" to={'/draft'}>
            DRAFT
          </Link>
          <Link className="nav-link" to={'/auth'}>
            SIGN IN
          </Link>
        </div>
      </div>

      <Outlet/>
    </Fragment>
  )
}

export default Navigation;