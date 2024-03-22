import React, { useState } from 'react';
import styles from "./signup.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
	const [email, setEmail] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const submitNewUser = async (e) => {
		e.preventDefault();

		if(password !== confirmPassword){
			console.log("Both passwords should be equal.");
			return;
		}

		const newUser = {
			email, fname, lname, password
		}

		try{
			const url = "http://localhost:5000/api/account/signup";
			const response = await axios.post(url, newUser, {
				header: {
					"Content-Type" : "application/json"
				},
				withCredentials : true
			});
			console.log(response.data.message);

			if(response.data.success === true) {
				setTimeout(()=> {
					navigate("/");
				},1000);
			}

		} catch (error) {
			console.error("Error creating account. \nERROR : ", error.message);
		}
	}


	return (
		<div className={styles["signup"]}>
			<div className={styles["heading"]}>Signup</div>
			<form id="signup" className={styles["signup-form"]} onSubmit={submitNewUser}>
				<div className={styles["input-div"]}>	
					Fname 
					<input className={styles["input"]} type='text' value={fname} onChange={e => setFname(e.target.value)}/>
				</div>
				<div className={styles["input-div"]}>	
					Lname 
					<input className={styles["input"]} type='text' value={lname} onChange={e => setLname(e.target.value)}/>
				</div>
				<div className={styles["input-div"]}>	
					Email 
					<input className={styles["input"]} type='text' value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className={styles["input-div"]}>	
					Password 
					<input className={styles["input"]} type='text' value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<div className={styles["input-div"]}>	
					Confirm Password 
					<input className={styles["input"]} type='text' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
				</div>
			</form>
			<button form="signup" className={styles["button"]} type='submit'>Submit</button>
			<Link className={styles["redirect"]} to="/login">Already have an account?</Link>
    </div>
	)
}

export default Signup