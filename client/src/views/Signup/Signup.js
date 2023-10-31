import React, { useState } from 'react'
import "./Signup.css"
import axios from 'axios'
import { Link } from 'react-router-dom'

function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("Female")

    const signup = async () => {
        if (!name) {
            alert("Name is required")
            return;
        }
        if (!email) {
            alert("Email is required")
            return;
        }

        if (!password) {
            alert("password is required")
            return;
        }

        if (!mobile) {
            alert("Mobile is required")
            return;
        }
        if (!address) {
            alert("Adress is required")
            return;
        }

        const response = await axios.post('/signup', {
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            address: address,
            gender: gender

        })
        alert(response?.data?.message);

        if (response?.data?.success) {
            alert(response?.data?.message);
            window.location.href = "/login";
        }
        // else{
        //     alert(response?.data?.message);
        // }
    };
    //     const response = axios.post('/signup', {
    //         name: name,
    //         email: email,
    //         password: password,
    //         mobile: mobile,
    //         address: address,
    //         gender: gender
    //     }

    //   await.response.save();

    //     )
    return (
        <div>
            <form className='signup-form'>
                <h1 className='text-center'>Signup</h1>

                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' placeholder='Enter Your Name' id='name' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>


                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' placeholder='Enter Your Email' id='email' className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='Enter Your Password' id='password' className='form-control' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor='mobile'>Mobile:</label>
                    <input type='text' placeholder='Enter Your Mobile' id='mobile' className='form-control' value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor='address'>Address:</label>
                    <input type='text' placeholder='Enter Your address' id='address' className='form-control' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>

                <div>

                    <input type='radio'
                        name='gender'
                        id='male'
                        className='gender'
                        checked={gender === "male"}
                        onClick={() => {
                            setGender("male");
                        }} />
                    <label htmlFor='male'>Male</label>

                    <input type='radio'
                        name='gender'
                        id='female'
                        className='gender'
                        checked={gender === "female"}
                        onClick={() => {
                            setGender("female");
                        }} />
                    <label htmlFor='female'>Female</label>

                </div>

                <button type='button'
                    className='btn signup-btn'
                    onClick={signup}>Signup</button>

                <p className="text-right">
                    <Link to="/login">Already have an account?</Link>
                </p>

            </form>
        </div>
    )
}

export default Signup
