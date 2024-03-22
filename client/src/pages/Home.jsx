import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Predict from 'components/predictPage';

const Home = () => {
  // const [data, setData] = useState('');

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/api/data');
    //         setData(response.data.message);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    return (
        <div className='w-full h-screen mt-0 pt-0'>
            <Predict/>
        </div>
    );
}

export default Home;