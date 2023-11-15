import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [registering,setRegistring] = useState(false);
    const [registerObject,setRegisterObject] = useState({mail:"" , password:""});
    const [message,setMessage] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch("http://localhost:3001/login" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMail: mail , userPass : pass })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.res === true ? navigate("/chatPage",{state:{mail:mail , uid:data.uid}}) 
            :setMessage("Wrong username or password");
        })
    }

    const handleRegister = () => {
        if (registerObject.mail === '' || registerObject.password === '') {
            alert("Please complete all the register inputs");
            return;
        }
        fetch("http://localhost:3001/register" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerObject)
        })
    }

    const handleRegisterChange = (event,key) => {
        const newRegisterObject = {...registerObject};
        newRegisterObject[key] = event.target.value;
        setRegisterObject(newRegisterObject);
    }

    return (
        <div className="loginContainer">
            <h3>Welcome , please enter your credentials to login</h3>
            <input 
                type='text' 
                placeholder="mail"
                value={mail}
                onChange={(event) => setMail(event.target.value)}
            />
            <input 
                type='password' 
                placeholder="password"
                value={pass}
                onChange={(event) => setPass(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p 
                id = "registerPar"
                onClick={() => setRegistring(prevReg => !prevReg)}
            >
                Click here to register
            </p>
            <p>{message}</p>

            {registering &&
            <div className="registerContainer">
                <h4>Please complete your info to register</h4>
                <input 
                    type='text' 
                    placeholder='mail'
                    value={registerObject.mail}
                    onChange={(event) => handleRegisterChange(event,'mail')}
                />
                <input 
                    type='password' 
                    placeholder='password'
                    value={registerObject.password}
                    onChange={(event) => handleRegisterChange(event,'password')}
                />
                <button onClick={handleRegister}>Register !</button>
            </div>
            }
        </div>
    )
}

export default Login;