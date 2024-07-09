import {useFormik} from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
    const [isNotAUser, setIsNotAUser] = useState(false)
    const [errosMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")
    console.log("login component token", token)
    useEffect(()=>{
        if(token !== undefined){
            navigate("/")
        }
    })
    
    const formik = useFormik({
        initialValues : {
            username : "",
            password : ""
        },
        onSubmit : async values => { 
            console.log("values", values)
            const {username, password} = values
            const userDetails = {username, password}
            const apiUrl = 'https://apis.ccbp.in/login'
            const options = {
                method: 'POST',
                body: JSON.stringify(userDetails),
            }
            //const response = await axios.post("https://apis.ccbp.in/login", userDetails)
            const response = await fetch(apiUrl, options)
            const data = await response.json()
            console.log("response", response)
            if(response.ok === true){
                console.log("token", data)
                setIsNotAUser(false)
                Cookies.set("jwt_token", data.jwt_token, {expires : 1})
                formik.resetForm()
                navigate("/")
            }else{
                setIsNotAUser(true)
                setErrorMsg(data.error_msg)
            }
        },
        validate : values => {
            let errors = {}
            if(!values.username){
                errors.username = "*Require username"
            }
            if(!values.password){
                errors.password = "*Require password"
            }
            return errors
        }
    })
    return(
        <div className='login-bg-container'>
            <form onSubmit={formik.handleSubmit} autoComplete='off' className='form-container'>
                <div className='login-logo-name-container'>
                    <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' className='jobby-app-logo'/>
                </div>
                <label htmlFor='username'>USERNAME</label>
                <input id='username' name="username" type='text' {...formik.getFieldProps("username")} className='login-inputs'/>
                {formik.touched.username && formik.errors.username ? <p className='error-message'>{formik.errors.username}</p> : null}
                <label htmlFor='password'>PASSWORD</label>
                <input id='password' name='password' type='password' {...formik.getFieldProps("password")} className='login-inputs'/>
                {formik.touched.password && formik.errors.password ? <p className='error-message'>{formik.errors.password}</p> : null}
                <button type='submit' className='login-button'>Login</button>
                {isNotAUser && <p className='error-message'>{errosMsg}</p>}
            </form>
        </div>
    )
}
export default Login