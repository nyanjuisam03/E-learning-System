// AddQuestionForm.js
import React, { useState, useEffect } from 'react';

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

export default AddQuestionForm;
