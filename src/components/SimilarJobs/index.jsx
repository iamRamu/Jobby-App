import { FaStar, FaLocationDot} from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import './index.css'
const SimilarJobs = props => {
    const {similarJobDetails} = props
    const {company_logo_url, employment_type, job_description, location, rating, title} = similarJobDetails
    return(
        <div className='similar-jobs-bg-container'>
            <div className='similar-jobs-company-logo-and-title-rating-container'>
                <img src={company_logo_url} className='similar-jobs-company-logo'/>
                <div className='similar-jobs-title-rating-container'>
                    <h3 className='similar-jobs-title'>{title}</h3>
                    <div style={{display:"flex"}}>
                        <FaStar className="star1"/>
                        <p className='similar-jobs-rating'>{rating}</p>
                    </div>
                </div>
            </div>
            <h3>Description</h3>
            <div className="unkown-container">
            <p className="similar-jobs-description">{job_description}</p>
            <div className="similar-jobs-footer">
                <div className="similar-jobs-location-employment-type-container"> 
                    <FaLocationDot style={{marginRight:"6px"}}/>
                    <p>{location}</p>
                </div>

                <div className="similar-jobs-location-employment-type-container">
                    <IoBriefcase style={{marginRight:"6px"}}/>
                    <p>{employment_type}</p>
                </div>
                </div>
            </div>
        </div>
    )
}
export default SimilarJobs