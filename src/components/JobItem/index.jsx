import { FaStar, FaLocationDot} from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import './index.css'
import { Link } from "react-router-dom";
const JobItem = props => {
    const {jobDetails} = props
    const {id, title, rating, company_logo_url, location, job_description, employment_type, package_per_annum} = jobDetails
    return(
        <Link to={`/jobs/${id}`} className="link-list-container">
            <li className='job-item-list-container'>
                <div className='job-item-top-container'>
                    <img src={company_logo_url} className='company-logo'/>
                    <div>
                        <h2 className='title'>{title}</h2>
                        <div className="rating-container">
                            <FaStar className='star'/>
                            <p className='rating'>{rating}</p>
                        </div>
                    </div>
                </div>
                <div className="middle-container">
                    <div className="location-employeetype-salary-container">
                        <div className="location-container">
                            <FaLocationDot className="location-icon"/>
                            <p>{location}</p>
                        </div>
                        <div className="location-container">
                            <IoBriefcase className="location-icon"/>
                            <p>{employment_type}</p>
                        </div>
                    </div>
                    <p>{package_per_annum}</p>
                </div>
                <hr/>
                <div>
                    <h3>Description</h3>
                    <p>{job_description}</p>
                </div>
            </li>
        </Link>
    )
}
export default JobItem