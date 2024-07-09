import './index.css'

const NotFound = () => {
    return(
        <div className='notfound-bg-container'>
            <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'/>
            <h2>Page Not Found</h2>
            <p className='not-found-paragraph'>We are sorry, the page you requested could not be found</p>
        </div>
    )
}
export default NotFound