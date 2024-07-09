import './index.css'
const SkillItem = props => {
    const {skillDetails} = props
    const {image_url, name} = skillDetails
    return(
        <div className='skillItem-bg-container'>
            <img src={image_url} className='skillItem-skill-logo'/>
            <p className='skill-name'>{name}</p>
        </div>
    )
}
export default SkillItem