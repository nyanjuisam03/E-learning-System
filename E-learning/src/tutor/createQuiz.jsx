import React, { useEffect, useState } from 'react';
import { FaBook } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai"; 
import { PiExam } from "react-icons/pi";
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';


const CreateQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);



    
    useEffect(() => {
        // Load questions from Firestore on component mount
        const fetchQuestions = async () => {
            try {
                const snapshot = await db.collection('questions').get();
                const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuestions(questionsData);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const toggleAddQuestionForm = () => {
        setShowAddQuestionForm(!showAddQuestionForm);
    };

    const handleAddQuestion = (questionData) => {
        if (editIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editIndex] = questionData;
            setQuestions(updatedQuestions);
            setEditIndex(null);
        } else {
            setQuestions([...questions, questionData]);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setShowAddQuestionForm(true);
    };

    const handleDelete = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
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
                                <li className="rounded-sm">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <PiExam  className='text-xl' />
                                        <span>Quizzes</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={toggleAddQuestionForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Question
                </button>
                {showAddQuestionForm && <AddQuestionForm onAddQuestion={handleAddQuestion} editIndex={editIndex} questions={questions} />}
                {questions.length > 0 && (
                    <div>
                        {questions.map((question, index) => (
                            <div key={index}>
                                <h3>{question.question}</h3>
                                <ul>
                                    {question.choices.map((choice, choiceIndex) => (
                                        <li key={choiceIndex}>{choice}</li>
                                    ))}
                                </ul>
                                <p>Correct Answer: {question.correctAnswer}</p>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const AddQuestionForm = ({ onAddQuestion, editIndex, questions }) => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [timer, setTimer] = useState(30); // Default timer value of 30 seconds

    useEffect(() => {
        if (editIndex !== null) {
            const editedQuestion = questions[editIndex];
            setQuestion(editedQuestion.question);
            setChoices(editedQuestion.choices);
            setCorrectAnswer(editedQuestion.correctAnswer);
            setTimer(editedQuestion.timer);
        }
    }, [editIndex, questions]);

    const handleChoiceChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const questionData = {
            question,
            choices,
            correctAnswer,
            timer,
        };
        onAddQuestion(questionData);
        // Clear form after successful submission
        setQuestion('');
        setChoices(['', '', '', '']);
        setCorrectAnswer(0);
        setTimer(30);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Question:
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
            </label>
            {choices.map((choice, index) => (
                <label key={index}>
                    Choice {index + 1}:
                    <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        required
                    />
                </label>
            ))}
            <label>
                Correct Answer:
                <select value={correctAnswer} onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}>
                    {choices.map((choice, index) => (
                        <option key={index} value={index}>{`Choice ${index + 1}`}</option>
                    ))}
                </select>
            </label>
            <label>
                Timer (seconds):
                <input type="number" value={timer} onChange={(e) => setTimer(parseInt(e.target.value))} required />
            </label>
            <button type="submit">{editIndex !== null ? 'Update Question' : 'Add Question'}</button>
        </form>
    );
};

export default CreateQuiz;
