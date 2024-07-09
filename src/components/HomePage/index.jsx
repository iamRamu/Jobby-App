import Cookies from 'js-cookie'
import { Outlet, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.css'
import Header from '../Header'

const HomePage = () => {
    const [isJobsShowing, setIsJobsShowing] = useState(false)
    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")
    //console.log("Home Component token", token)
    const LogOut = () => {
        Cookies.remove("jwt_token")
        navigate("/login")
    }
    const homeButtonCliked = () => {
        setIsJobsShowing(false)
        navigate("/")
    }
    const jobsButtonClicked = () => {
        setIsJobsShowing(true)
        navigate("/jobs")
    }
    useEffect(() => {
        if(token === undefined){
            navigate("/login")
        }
    })
    return(
        <div className='homepage-bg-container' >
            <Header LogOut={LogOut} homeButton={homeButtonCliked} jobsButton={jobsButtonClicked}/>
            <Outlet />
        </div>
    )
}
export default HomePage