import React, { useEffect, useState } from 'react';
import { FaBook } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai"; 
import { useParams,Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db,storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Tutorhome() {
  const { courseId } = useParams(); // Get the courseId parameter from the URL
  const [courseName, setCourseName] = useState('');
  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState('');
  const [files, setFiles] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId)); // Fetch the course document
        if (courseDoc.exists()) {
          setCourseName(courseDoc.data().name); // Set the courseName state to the name of the course
          setTopics(courseDoc.data().topics || []); // Set the topics state to the topics array in the course document
          setQuizzes(courseDoc.data().quizzes || []); // Set the quizzes state to the quizzes array in the course document
          setFiles(courseDoc.data().files || {}); // Set the files state to the files object in the course document
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleAddTopic = async () => {
    try {
      const topicName = `Topic ${topics.length + 1}`;
      await updateDoc(doc(db, 'courses', courseId), {
        topics: arrayUnion(topicName), // Add the new topic to the topics array in the course document
      });
      setTopics([...topics, topicName]); // Update the topics state with the new topic
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  const handleAddQuiz = async () => {
    try {
      const quizName = `Quiz ${quizzes.length + 1}`;
      await updateDoc(doc(db, 'courses', courseId), {
        quizzes: arrayUnion(quizName),
      });
      setQuizzes([...quizzes, quizName]);
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  const handleFileUpload = async (itemName) => {
    if (!file || !itemName) {
      console.error('File or item name not provided');
      return;
    }

    try {
      const fileRef = ref(storage, `${courseId}/${itemName}/${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);
      console.log('File uploaded successfully:', fileUrl);
      // Add the file URL to Firestore
      await updateDoc(doc(db, 'courses', courseId), {
        files: { ...files, [itemName]: [...(files[itemName] || []), { name: file.name, fileURL: fileUrl }] },
      });
      setFiles({ ...files, [itemName]: [...(files[itemName] || []), { name: file.name, fileURL: fileUrl }] });
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDeleteTopic = async (topicName) => {
    try {
      await updateDoc(doc(db, 'courses', courseId), {
        topics: arrayRemove(topicName), // Remove the topic from the topics array in the course document
        files: { ...files, [topicName]: [] }, // Remove files associated with the deleted topic
      });
      setTopics(topics.filter(topic => topic !== topicName)); // Update the topics state to remove the deleted topic
      setFiles({ ...files, [topicName]: [] }); // Update the files state to remove files associated with the deleted topic
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleDeleteQuiz = async (quizName) => {
    try {
      await updateDoc(doc(db, 'courses', courseId), {
        quizzes: arrayRemove(quizName),
      });
      setQuizzes(quizzes.filter(quiz => quiz !== quizName));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  

  return (
    <div className='flex'>
      <div className='h-100%'>
        <div className="flex flex-col h-full p-3 w-60 dark:bg-gray-200 dark:text-gray-800  bg-red-300">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2>Dashboard</h2>
            </div>
      
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Link to={'/tutor-course'}>
                  <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <AiOutlineHome className='text-xl' />
                    <span>Home</span>
                  </a>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <FaBook className='text-xl'/>
                    <span>Courses</span>
                  </a>
                </li>
                <li className="rounded-sm">
                  <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <PiStudentLight className='text-xl' />
                    <span>Students</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
      
        </div>
      </div>
      
      <div className="card  bg-base-100 shadow-xl mx-6 p-12 flex flex-col ">
        <h2>Course Name: {courseName}</h2>
        <div>
          <button className='bg-sky-500/75 p-2' onClick={handleAddTopic}>Add Topic</button>
          <button className='bg-sky-500/75 p-2 mx-4' onClick={handleAddQuiz}>Add Quiz</button>
          <ul>
          {topics.map((topic, index) => (
              <details key={index} className="collapse bg-base-200 my-2">
                <summary className="collapse-title text-xl font-medium">{topic}</summary>
                <div className="collapse-content flex flex-col">
                  <div>
                    <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button className='p-2 bg-green-600' onClick={() => handleFileUpload(topic)}>Submit</button>
                  </div>
                  {files[topic] && files[topic].map((file, fileIndex) => (
                    <div key={fileIndex}>
                      <a href={file.fileURL} target="_blank" rel="noreferrer">{file.name}</a>
                    </div>
                  ))}
      <button onClick={() => handleDeleteTopic(topic)} className="p-2 bg-red-700/70 my-2">Delete</button>
    </div>
  </details>
))}

</ul>

<ul>{quizzes.map((quiz, index) => (
            <details key={index} className="collapse bg-base-200 my-2">
              <summary className="collapse-title text-xl font-medium">{quiz}</summary>
              <div className="collapse-content flex flex-col">
                {/* Quiz content */}
                <button onClick={() => handleDeleteQuiz(quiz)} className="p-2 bg-red-700/70 my-2">Delete</button>
              </div>
            </details>
          ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Tutorhome;
