import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { useEffect, useState } from 'react'
import { FaStar, FaLocationDot} from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import SkillItem from '../SkillItem';
import SimilarJobs from '../SimilarJobs';
const BrowseJobDetails = () => {
    const [specificJob, setSpecificJob] = useState(null)
    const token = Cookies.get("jwt_token")
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(()=>{
        if(token === undefined){
            navigate("/login")
        }
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        const getSpecificJobDetails = async() => {
            try {
                const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
                const data = await response.json()
                setSpecificJob(data)
            }
            catch (error) {
                console.log("error specificJob Details", error.message)
            }
        }
        getSpecificJobDetails()
    },[])
    return(
        <div className='specific-job-details-bg-container'>
            {specificJob ? 
                <div className='customize-bg-container'>
                    <li className='job-item-list-container customize-list-cotainer'>
                        <div className='job-item-top-container'>
                            <img src={specificJob.job_details.company_logo_url} className='company-logo'/>
                            <div>
                                <h2 className='title'>{specificJob.job_details.title}</h2>
                                <div className="rating-container">
                                    <FaStar className='star'/>
                                    <p className='rating'>{specificJob.job_details.rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className="middle-container">
                            <div className="location-employeetype-salary-container">
                                <div className="location-container">
                                    <FaLocationDot className="location-icon"/>
                                    <p>{specificJob.job_details.location}</p>
                                </div>
                                <div className="location-container">
                                    <IoBriefcase className="location-icon"/>
                                    <p>{specificJob.job_details.employment_type}</p>
                                </div>
                            </div>
                            <p>{specificJob.job_details.package_per_annum}</p>
                        </div>
                        <hr/>
                        <div>
                            <h3>Description</h3>
                            <p>{specificJob.job_details.job_description}</p>
                        </div>
                        <h2>Skills</h2>
                        <div className='skills-main-container'>
                            {specificJob.job_details.skills.map((eachSkill, index) => <SkillItem key={index} skillDetails={eachSkill}/>)}
                        </div>
                        <h2>Life at Company</h2>
                        <div className='life-at-company-bg-container'>
                            <p className='life-at-company-description'>{specificJob.job_details.life_at_company.description}</p>
                            <img src={specificJob.job_details.life_at_company.image_url} className='life-at-company-img'/>
                        </div>
                    </li>
                    <div className='browse-job-details-bottom-container'>
                        <h2>Similar Jobs</h2>
                        <div className='similar-job-main-container'>
                            {specificJob.similar_jobs.map(eachSimilarJob => <SimilarJobs similarJobDetails={eachSimilarJob} key={eachSimilarJob.id}/>)}
                        </div>
                    </div>
                </div>
            
            : ""}
            
        </div>
    )
}
export default BrowseJobDetails