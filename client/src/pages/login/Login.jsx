import React, { useState } from 'react';
import styles from "./login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const submitUserLogin = async (e) => {
		e.preventDefault();

		const user = {email, password};

		try{
			const url = "http://localhost:5000/api/account/login";
			const response = await axios.post(url, user, {
				headers:{
					"Content-Type": "application/json"
				},
				withCredentials : true
			});
			console.log(response.data.message);

			if(response.data.success === true) {
				setTimeout(() => {
					navigate("/");
				}, 1000);
			}
		} catch (error) {
			console.log("Error logging in. \nERROR : ",error.message);
		}
	}

	return (
		<div className={styles["login"]}>
			<div className={styles["heading"]}>Login</div>
			<form id="login" className={styles["login-form"]} onSubmit={submitUserLogin}>
				<div className={styles["input-div"]}>	
					Email 
					<input className={styles["input"]} type='text' value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className={styles["input-div"]}>	
					Password 
					<input className={styles["input"]} type='text' value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
			</form>
			<button form="login" className={styles["button"]} type='submit'>Login</button>
			<Link className={styles["redirect"]} to="/account/signup">Create new account</Link>
		</div>
	)
}

export default Login