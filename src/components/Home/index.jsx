import { Link } from 'react-router-dom'
import './index.css'

const Home = () => {
    return(
        <div className='home-bottom-container'>
            <h1 className='find-job-heading'>Find The Job That Fits Your Life</h1>
            <p className='find-job-description'>
                Millions of people are searching for jobs, salary
                information, company reviews. Find the job that fits your
                abilities and potential.
            </p>
            <Link to="/jobs"><button className='find-jobs-button'>Find Jobs</button></Link>
            
        </div>
    )
}
export default Home