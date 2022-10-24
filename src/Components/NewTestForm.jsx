import React, { useContext } from 'react';
import '../Styles/NewTest.css';
import { topicsContext, questionNoContext } from './App';
import { useNavigate } from "react-router-dom";

// conponent for showing loading animation
// used while the quiz data is fetched
function LoadingBox() {
	return (
	<div className="loader">
		<div className='innerLoader'></div>
	</div>)
}

function CheckboxGroup({ topic, subtopics }) {
	return (
		<div className='checkbox-group'>
			<h4 className='topic-heading'>{topic} :</h4>
			<div className='subtopics'>
				{subtopics.map(subtopic => {
					return <Checkbox key={subtopic} subtopic={subtopic} />;
				})}
			</div>
		</div>
	);
}

function Checkbox({ subtopic }) {
	const [topics, setTopics] = useContext(topicsContext);

	
	return (
		<div className='subtopic-item'>
			<input
				type='checkbox'
				onChange={e => {
					const obj = {};
					obj[subtopic] = e.target.checked !== undefined? e.target.checked: false;
					setTopics(obj);
				}}
				checked={topics[subtopic]}
				name={subtopic}
				id={subtopic}
			/>

			<label className='checkbox' htmlFor={subtopic}>
				{subtopic}
			</label>
		</div>
	);
}

export default function NewTestForm({ topics, onStart }) {

	// instantiating the navigate object to go to links
	const navigate = useNavigate();

	const [questionNo, setQuestionNo] = useContext(questionNoContext)
	return (
		<>
			<h2>
				<span className='outline'>Customise your</span> Test
			</h2>

			<form className='newTest'>
				<label htmlFor="questionNoInput">Number of questions (5-40)</label>
				<input id='questionNoInput' value={questionNo} onChange={(e) => {
					setQuestionNo(Number(e.target.value))
				}} type='number' max='40' min='5' />
				<h3>Select Topics</h3>

				{Object.keys(topics).length !== 0 || <LoadingBox/>}	
				{Object.keys(topics).map(topic => {
					return <CheckboxGroup key={topic} topic={topic} subtopics={topics[topic]} />;
				})}

				<input type='submit' value='Start Test' onClick={e => {
					e.preventDefault();
					if (onStart()) {
						navigate('/test')
					}
				}} />
			</form>
			
		</>
	);
}
