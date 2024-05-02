import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { PiCookingPot } from "react-icons/pi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FaPhotoVideo } from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function Course() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
      });
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);
  return (
    <div>
    <h2>Which skillwould you like to learn </h2>
    <Splide  options={ {
    rewind: true,
    gap   : '18px',
    perPage: 3,
  } } >
  <SplideSlide className='h-40'>
    <Link to={'/cooking'}>
    <div className="card w-44 h-32 bg-green-500 shadow-xl my-2  text-white" >
      <div className='mx-12 my-9'>
      <PiCookingPot className='mx-5 text-2xl'/>
      <h2>Cooking</h2>
      </div>
    </div>
    </Link>
  </SplideSlide>
  <SplideSlide>
    <div className="card w-44 h-32 bg-green-500 shadow-xl my-2  text-white">
      <div className='mx-12 my-9'>
      <HiOutlinePaintBrush className='mx-5 text-2xl' />
    <h2 className='mx-5'>Art</h2>
      </div>
    </div>
  </SplideSlide>
  <SplideSlide>
    <div className="card w-44 h-32 bg-green-500 shadow-xl my-2  text-white">
      <div className='mx-12 my-7'>
      <FaPhotoVideo className='mx-5 text-2xl' />
    <h2>Film And Editng</h2>
      </div>
    </div>
  </SplideSlide>
  <SplideSlide>
    <div className="card w-44 h-32 bg-green-500 shadow-xl my-2  text-white">
      <div className='mx-12 my-7'>
      <GiHairStrands className='mx-5 text-2xl'/>
    <h2>Beauty and Hairstyles</h2>
      </div>
   
    </div>
  </SplideSlide>
  
</Splide>

    </div>
  )
}

export default Course
