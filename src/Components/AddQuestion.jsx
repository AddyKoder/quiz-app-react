import React, {useState } from 'react';
import '../Styles/AddQuestion.css';

// TODO

// implement the code for fetching and uploading
// questions to pantry basket


function submitQuestion(question, validInputs) {
	// now here you are getting the question item
	// and you have to upload it to pantry
	if (!validInputs) window.alert('Please completely fill all the required fields before adding a question')
}

export default function AddQuestion() {
	const [topic, setTopic] = useState('');
	const [subtopic, setSubtopic] = useState('');
	const [statement, setStatement] = useState('')
	const [answer, setAnswer] = useState('')
	const [option1, setOption1] = useState('')
	const [option2, setOption2] = useState('')
	const [option3, setOption3] = useState('')

	const question = {
		// lowercasing all the values
		statement:statement.toLowerCase(),
		id: new Date().getTime(),
		option: [answer, option1, option2, option3].map((i)=>i.toLowerCase()),
		topic:[topic, subtopic].map((i)=>i.toLowerCase())
	};

	function checkValidInputs() {
		for (let input of [topic, subtopic, statement, answer, option1, option2, option3]) {
			if (input.replaceAll(' ', '') === '') return false
		}

		return true
	}

	return (
		<div className='add-question'>
			<h2>Add your Question</h2>
			<form className='add-question'>
				<div className='topicSelection'>
					<input type='text' placeholder='Topic' value={topic} onChange={(e) => {
						setTopic(e.target.value)
					}} />
					<input type='text' placeholder='Subtopic' value={subtopic} onChange={(e) => {
						setSubtopic(e.target.value)
					}}  />
				</div>

				<hr />
				<input type='text' placeholder='Question Statement' value={statement} onChange={(e) => {
						setStatement(e.target.value)
					}}  />
				<input type='text' placeholder='Answer' value={answer} onChange={(e) => {
						setAnswer(e.target.value)
					}} />
				<hr />

				<h4>Options</h4>

				<input className='optionInput' type='text' placeholder='Option 1' value={option1} onChange={(e) => {
						setOption1(e.target.value)
					}}  />
				<input className='optionInput' type='text' placeholder='Option 2' value={option2} onChange={(e) => {
						setOption2(e.target.value)
					}} />
				<input className='optionInput' type='text' placeholder='Option 3' value={option3} onChange={(e) => {
						setOption3(e.target.value)
					}} />

				<input type='submit' value='Add Question' onClick={(e) => { e.preventDefault(); submitQuestion(question, checkValidInputs())}} />
			</form>
		</div>
	);
}
