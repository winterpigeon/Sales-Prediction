import React, {useState} from 'react';
import axios from "axios";
import styles from "./upload.module.css";

const Upload = () => {
  const [csv, setCsv] = useState();

  const uploadCSV = async (e) => {
    e.preventDefault();
  
    const url = "http://localhost:5000/upload";
    const formData = new FormData();
    formData.append("file", csv); // Append the file to FormData
  
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <form className={styles["upload"]} onSubmit={uploadCSV}>
      <div className={styles["label"]}>Upload file</div>
      <input type="file" className={styles["select-file"]} onChange={e => setCsv(e.target.files[0])}/>
      <button type="submit" className={styles["submit"]}>Upload</button>
    </form>
  )
}

export default Upload;