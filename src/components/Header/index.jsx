import { Link } from 'react-router-dom'
import './index.css'
const Header = props => {
    const {LogOut, homeButton, jobsButton} = props
    const clickedLogoutButton = () => {
        LogOut()
    }
    const homecliked = () => {
        homeButton()
    }
    const jobsCliked = () => {
        jobsButton()
    }
    return(
        <nav className='nav-bar'>
            <Link to="/"><img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' className='header-jobby-logo'/></Link>
            <div className='nav-sub-container'>
                <h4 onClick={homecliked}>Home</h4>
                <h4 onClick={jobsCliked}>Jobs</h4>
            </div>
            <button className='logout-button' onClick={clickedLogoutButton}>LogOut</button>
        </nav>
    )
}
export default Header