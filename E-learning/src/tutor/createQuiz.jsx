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
            const questionId = uuidv4(); // Generate a unique ID for the question
            await addDoc(collection(db, 'questions'), { id: questionId, ...questionData });

            // Update the quiz document to add the question ID
            const quizRef = doc(db, 'courses', courseId, 'quizzes', quizId);
            await updateDoc(quizRef, {
                questions: [...(quizRef.questions || []), questionId], // Add question ID to questions array
            });

            console.log('Question added with ID: ', questionId);
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
