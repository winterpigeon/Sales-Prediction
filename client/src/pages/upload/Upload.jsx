import React, { useState } from 'react';
import axios from "axios";
import Navbarr from '../../components/navbarr';
import Sidebar from '../../components/sidebar';
import { Card } from '@nextui-org/react';
const Upload = () => {
  const [csv, setCsv] = useState();

  const uploadCSV = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/upload";
    const formData = new FormData();
    formData.append("file", csv); 

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <>
      <Navbarr/>
      <div className='w-full h-full flex flex-row flex-wrap bg-gradient-to-t from-sky-700 to-blue-500 '>
        <div className='w-1/5 h-full sticky top-0'><Sidebar /></div>
        <div className='w-4/5 h-full flex flex-row flex-wrap justify-center items-center '>
          <Card className='p-10 w-1/2 h-1/2 mt-10'>
          <form className="flex flex-col items-center mt-8" onSubmit={uploadCSV}>
            <label htmlFor="fileInput" className="mb-4 text-lg font-medium">Upload file</label>
            <input
              id="fileInput"
              type="file"
              className="mb-4 border border-gray-300 rounded px-4 py-2"
              onChange={e => setCsv(e.target.files[0])}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
              Upload
            </button>
          </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Upload;

