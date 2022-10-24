import React, {useState } from 'react';
import '../Styles/AddQuestion.css';
import { LoadingBox } from '../Components/NewTestForm'

// TODO

// implement the code for fetching and uploading
// questions to pantry basket


async function submitQuestion(question, onSubmitted) {
	// now here you are getting the question item
	// and you have to upload it to pantry

	fetch('https://getpantry.cloud/apiv1/pantry/76a8c7e8-1177-4776-b59f-6733f547e7ee/basket/quizapp', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body:JSON.stringify({data:[question]})

	}).then((res) => {
		console.log(res);
		onSubmitted()
		setTimeout(() => {
			
			window.alert('Question Added Successfully. View log in the console')
		}, 100);
	})

	return true
}

export default function AddQuestion() {
	const [topic, setTopic] = useState('');
	const [subtopic, setSubtopic] = useState('');
	const [statement, setStatement] = useState('')
	const [answer, setAnswer] = useState('')
	const [option1, setOption1] = useState('')
	const [option2, setOption2] = useState('')
	const [option3, setOption3] = useState('')
	const [loading, setLoading] = useState(false)
	
	
	const question = {
		// lowercasing all the values
		statement:statement,
		id: new Date().getTime(),
		options: [answer, option1, option2, option3],
		type:[topic, subtopic].map((i)=>i.toLowerCase())
	};

	function checkValidInputs() {
		for (let input of [topic, subtopic, statement, answer, option1, option2, option3]) {
			if (input.replaceAll(' ', '') === '') return false
		}

		return true
	}

	function submitQuestionGuard(e) {
		e.preventDefault()
		
		if (!checkValidInputs()) {
			window.alert('Please completely fill all the required fields before adding a question');
			return false;
		}

		setLoading(true)
		// setting all the input fields to null after question is added
		setTopic(''); setSubtopic(''); setStatement(''); setAnswer(''); setOption1(''); setOption2(''); setOption3('')
		
		submitQuestion(question, ()=>setLoading(false))
	}

	if (loading) return <LoadingBox/>

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

				<input type='submit' value='Add Question' onClick={submitQuestionGuard} />
			</form>
		</div>
	);
}
