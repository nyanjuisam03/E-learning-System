import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection ,doc} from 'firebase/firestore';
import { db } from '../firebase';

const CreateQuiz = () => {
    const { courseId, quizId } = useParams();
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(1); // Start at 1
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
            const courseRef = doc(db, 'courses', courseId);
            const courseSnapshot = await getDoc(courseRef);
            if (courseSnapshot.exists()) {
                const courseData = courseSnapshot.data();
                const quizzes = courseData.quizzes || [];
                const updatedQuizzes = quizzes.map((quiz) => {
                    if (quiz.name === quizName) { // Assuming each quiz has a unique name
                        return { ...quiz, questions: [...(quiz.questions || []), questionData] };
                    }
                    return quiz;
                });
                await updateDoc(courseRef, { quizzes: updatedQuizzes });
                console.log('Question added to quizzes array');
            } else {
                console.error('Course document not found');
            }
            // Reset form fields after successful submission
            setQuestion('');
            setChoices(['', '', '', '']);
            setCorrectAnswer(1); // Reset to 1
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
                    <>
                    <div className='flex'>
                    <label key={index}>
                        Choice {index + 1}: {/* Display index + 1 */}
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
                    </>
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
