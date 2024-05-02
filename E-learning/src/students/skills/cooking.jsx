import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function Cooking() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category === 'cooking') {
          coursesData.push({ id: doc.id, ...data });
        }
      });
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {courses.map((course) => (
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
