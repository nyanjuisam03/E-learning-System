import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db,auth } from '../firebase';
import { PiCookingPot } from "react-icons/pi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FaPhotoVideo } from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Studenthome() {
  const [courses, setCourses] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    };


    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
      });
      setCourses(coursesData);
    };
    fetchUserEmail();
    fetchCourses();
  }, []);
  return (
    <div className='mx-12'>
    <h2>Welcome {userEmail}</h2> 
    <h3>Available Courses:</h3>
    <Splide  options={ {
    rewind: true,
    gap   : '18px',
    perPage: 3,
  } } >
  <SplideSlide className='h-40'>
    <div className="card w-44 h-32 bg-green-500 shadow-xl my-2  text-white" >
      <div className='mx-12 my-9'>
      <PiCookingPot className='mx-5 text-2xl'/>
      <h2>Cooking</h2>
      </div>
    </div>
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
     <h2>Recent Course Additions: </h2>
        {courses.map((course) => (
          <div key={course.id} className="card w-72 bg-base-100 shadow-xl my-4 p-6 flex">
          <h2 className="card-title">{course.name}</h2>
          <p className='text-sm'> {course.description}</p>
          <div className='justify-end'>
          <button className="btn btn-outline btn-success">Join Now</button>
          </div>
          </div>
        ))}
   
     
    </div>
  )
}

export default Studenthome
