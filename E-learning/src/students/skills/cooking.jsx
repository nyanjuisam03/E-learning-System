import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function Cooking() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesArray);
        console.log('Fetched courses:', coursesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {/* Filter courses directly in the map function */}
      {courses
        .filter((course) => course.category === 'Cooking')
        .map((course) => (
          <div key={course.id} className="card max-w-md bg-base-100 shadow-xl my-4 p-6">
            <h2 className="card-title">{course.name}</h2>
            <p>{course.description}</p>
            <button className="btn btn-outline btn-success my-4">Join Now</button>
          </div>
        ))}
    </div>
  );
}

export default Cooking;
