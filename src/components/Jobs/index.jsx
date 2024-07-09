import Cookies from 'js-cookie'
import {DNA} from 'react-loader-spinner'
import './index.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Search } from 'lucide-react';
import JobItem from '../JobItem'

const Jobs = () => {
    const [profileDetails, setProfileDetails] = useState(null)
    const [jobs, setJobs] = useState(null)
    const [filteredJobs, setFilteredJobs] = useState(jobs)
    const [userSearchInput, setUserSearchInput] = useState("")
    const [profileDetailsError, setProfileDetailsError] = useState(false)
    const [jobsDeatailsError, setJobsDeatailsError] = useState(false)

    const [isfulltimeChecked, setIsFulltimeCheked] = useState(false)
    const [isPartTimeChecked, setIsPartTimeChecked] = useState(false)
    const [isFreelanceChecked, setIsFreelanceCheked] = useState(false)
    const [isInternshipChecked, setIsInternshipChecked] = useState(false)
    const [salaryRadioButton, setSalaryRadioButton] = useState("")
    const [result, setResult] = useState([])
    //console.log("result", result)

    const handleCheckbox = event => {
        setIsFulltimeCheked(event.target.checked)
        if(event.target.checked){
            setResult(prev => [...prev, "FULLTIME"])
        }else{
            if(result.includes("FULLTIME")){
                // const index = result.indexOf("FULLTIME")
                // console.log(`${index} fulltime`)
                // result.pop(index)
                setResult(result.filter(item => item !== "FULLTIME"));
            }
        }
    }

    const handlePartTimeCheckbox = event => {
        setIsPartTimeChecked(event.target.checked)
        if(event.target.checked){
            setResult(prev => [...prev, "PARTTIME"])
        }else{
            if(result.includes("PARTTIME")){
                setResult(result.filter(item => item !== "PARTTIME"));
            }
        }
    }

    const handleFreelanceCheckbox = event => {
        setIsFreelanceCheked(event.target.checked)
        if(event.target.checked){
            setResult(prev => [...prev, "FREELANCE"])
        }else{
            if(result.includes("FREELANCE")){
                setResult(result.filter(item => item !== "FREELANCE"));
            }
        }
    }

    const handleInternshipCheckbox = event => {
        setIsInternshipChecked(event.target.checked)
        if(event.target.checked){
            setResult(prev => [...prev, "INTERNSHIP"])
        }else{
            if(result.includes("INTERNSHIP")){
                setResult(result.filter(item => item !== "INTERNSHIP"));
            }
        }
    }


    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")

    useEffect(()=>{
        if(token === undefined){
            navigate("/login")
        }
        const getProfileDetails = async () => {
            const url = "https://apis.ccbp.in/profile"
            const options = {
                method : "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            try {
                const response = await fetch(url, options)
                const data = await response.json()
                setProfileDetails(data.profile_details)
                setProfileDetailsError(false)
            } catch (error) {
                console.log("profile api error", error.message)
                setProfileDetailsError(true)
            }
            
        }
        getProfileDetails()
        const getJobs = async() => {
            const options = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            try {
                const response = await axios.get(`https://apis.ccbp.in/jobs?employment_type=${result}&minimum_package=${salaryRadioButton}&search=${userSearchInput}`, options)
                const data = await response.data
                setJobs(data.jobs)
                setFilteredJobs(data.jobs)
                setJobsDeatailsError(false)
            } catch (error) {
                console.log("jobs api error", error.message)
                setJobsDeatailsError(true)
            }
            
        }
        getJobs()
    },[isfulltimeChecked, isPartTimeChecked, isFreelanceChecked, isInternshipChecked, result, salaryRadioButton])

    const searchIconClicked = () => {
        if(jobs){
            const modifiedFilteredJobs = jobs.filter(everyJob => everyJob.title.toLowerCase().includes(userSearchInput.toLowerCase()))
            setFilteredJobs(modifiedFilteredJobs)
        }
        
    }
    const profileErrorContainer = profileDetailsError ? "profile-error-container" : "profile-container"
    //console.log("filteredJobs", filteredJobs)
    //console.log("length", Object(filteredJobs).length)
    return(
        <div className='jobs-bg-container'>
            <div className='jobs-side-bar-container'>
                <div className={`${profileErrorContainer}`}>
                    {profileDetailsError ?

                        <div>
                            <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' className='profile-error'/>
                        </div>
                        : 
                        profileDetails ? 
                            <div>
                                <img src={profileDetails.profile_image_url}/>
                                <h2>{profileDetails.name}</h2>
                                <p>{profileDetails.short_bio}</p>
                            </div>
                            :
                            <div className="dna-loader">
                                <DNA
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />
                            </div>
                        
                    }
                    
                </div>
                <hr/>
                <p>Type of Employeement</p>
                <div style={{display: "flex"}}> 
                    <input type='checkbox' id='fulltime' checked={isfulltimeChecked} onChange={handleCheckbox}/>
                    <label htmlFor='fulltime'>Full Time</label>
                </div>
                <div style={{display: "flex"}}> 
                    <input type='checkbox' id='parttime' checked={isPartTimeChecked} onChange={handlePartTimeCheckbox}/>
                    <label htmlFor='parttime'>Part Time</label>
                </div>
                <div style={{display: "flex"}}> 
                    <input type='checkbox' id='freelance' checked={isFreelanceChecked} onChange={handleFreelanceCheckbox}/>
                    <label htmlFor='freelance'>Freelance</label>
                </div>
                <div style={{display: "flex"}}> 
                    <input type='checkbox' id='internship' checked={isInternshipChecked} onChange={handleInternshipCheckbox}/>
                    <label htmlFor='internship'>Internship</label>
                </div>

                <hr/>
                <p>Salary Range</p>
                <div style={{display: "flex"}}> 
                    <input type='radio' id='10l' name='salary' onChange={()=>setSalaryRadioButton("1000000")}/>
                    <label htmlFor='10l'>10 LPA and above</label>
                </div>
                <div style={{display: "flex"}}> 
                    <input type='radio' id='20l' name='salary' onChange={()=>setSalaryRadioButton("2000000")}/>
                    <label htmlFor='20l'>20 LPA and above</label>
                </div>
                <div style={{display: "flex"}}> 
                    <input type='radio' id='30l' name='salary' onChange={()=>setSalaryRadioButton("3000000")}/>
                    <label htmlFor='30l'>30 LPA and above</label>
                </div>
                <div style={{display: "flex"}}> 
                    <input type='radio' id='40l' name='salary' onChange={()=>setSalaryRadioButton("4000000")}/>
                    <label htmlFor='40l'>40 LPA and above</label>
                </div>
                
            </div>
            <div className='jobs-container'>
                <div className='search-input-container'>
                    <input type='search' className='search-input' placeholder='Search' onChange={event => setUserSearchInput(event.target.value)}/>
                    <Search className='search-icon' onClick={searchIconClicked}/>
                </div>
                <ul className='jobs-ul-container'>
                    {jobsDeatailsError ?

                        <div>
                            <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' className='profile-error'/>
                        </div>
                        :
                        filteredJobs ? 
                        filteredJobs.map(eachJob => <JobItem jobDetails={eachJob} key={eachJob.id}/>)
                        :
                        <div className="dna-loader1">
                            <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                        </div>

                    }
                    {
                        Object(filteredJobs).length === 0 &&
                        <div className='no-jobs-available-container'>
                           <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' className='no-jobs-logo'/>
                           <h2>No Jobs Available</h2>
                        </div>
                    }

                    
                </ul>
                
            </div>
        </div>
    )
}
export default Jobs