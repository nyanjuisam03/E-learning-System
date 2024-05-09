import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const CreateQuiz = () => {
    const { courseId, quizId } = useParams();
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(1);
    const [timerCategory, setTimerCategory] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const questionData = {
            question,
            choices,
            correctAnswer,
            timerCategory,
        };
    
        try {
            // Add the question to the 'questions' collection
            const questionDocRef = await addDoc(collection(db, 'questions'), questionData);
            const questionId = questionDocRef.id;
    
            // Update the 'quizzes' array in the course document to link the question ID to the current quiz
            const courseDocRef = doc(db, 'courses', courseId);
            const courseDoc = await getDoc(courseDocRef);
            if (courseDoc.exists()) {
                const quizIndex = courseDoc.data().quizzes.findIndex(quiz => quiz.id === quizId);
                if (quizIndex !== -1) {
                    const updatedQuizzes = [...courseDoc.data().quizzes];
                    updatedQuizzes[quizIndex].questions.push(questionId);
                    await updateDoc(courseDocRef, { quizzes: updatedQuizzes });
                } else {
                    console.error('Quiz not found in course document');
                }
            } else {
                console.error('Course document not found');
            }
    
            // Reset form fields after successful submission
            setQuestion('');
            setChoices(['', '', '', '']);
            setCorrectAnswer(1);
            setTimerCategory('');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };
    return (
        <div className='flex flex-col'>
            <h2>Add Question</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Question:
                        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                    </label>
                </div>
                {choices.map((choice, index) => (
                    <div className='flex' key={index}>
                        <label>
                            Choice {index + 1}:
                            <input
                                type="text"
                                value={choice}
                                onChange={(e) => {
                                    const newChoices = [...choices];
                                    newChoices[index] = e.target.value;
                                    setChoices(newChoices);
                                }}
                                required
                            />
                        </label>
                    </div>
                ))}
                <label>
                    Correct Answer:
                    <select value={correctAnswer} onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}>
                        {choices.map((choice, index) => (
                            <option key={index} value={index + 1}>{`Choice ${index + 1}`}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Timer Category:
                    <input type="text" value={timerCategory} onChange={(e) => setTimerCategory(e.target.value)} required />
                </label>
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
