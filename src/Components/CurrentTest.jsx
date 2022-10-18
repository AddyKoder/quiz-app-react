import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import '../Styles/CurrentTest.css'


function OptionItem({ question, option }) {
	const statement = question.statement;

	return <div className="option">
		<input type="radio" name={`${statement}`} id={`${statement}__${option}`} />

		<label htmlFor={`${statement}__${option}`}>{option}</label>
	</div>
}

function QuestionDisplay({ question }) {
	

	return <div className="questionItem">
		<span>{question.n}</span><p className='question-statement'>{question.statement}</p>
		{question.options.map((option) => {
			return <OptionItem key={option} question={question} option={option} />
		})}

	</div>
}

export default function CurrentTest({ time, onAbort, isPlaying, questions, topicsCount}) {
	if (isPlaying) {
		return (
			<div className='test'>
				<div className="super-header">
					<h2>
						Current Test
					</h2>
						<span className="header-info">
							<span className="bright">{questions.length}</span> Questions of <span className="bright">{topicsCount}</span> Topics
						</span>
				</div>
				<header>

					<button id="test-abort-button" onClick={() => {
						if(window.confirm('Are you Sure, You want to Abort the current Test? All the data will be lost.')) onAbort()
				}}>Abort Test</button>
				<div className='timer' >{ time/60 < 10? `0${Math.floor(time / 60)}`:Math.floor(time / 60)}:{time%60 < 10 ? `0${time%60}` : time%60}</div>
				</header>

				<form>
					{questions.map((question) => <QuestionDisplay key={question.id} question={question} />)}
				</form>
			</div>
		);
	}

	// returning what to display when has not yet started or being aborted
	return (
		<>
			<h2 style={{ color: 'grey' }}>Test is not yet started</h2>
			<p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'grey' }}>
				Try starting a test{' '}
				<Link style={{ color: 'var(--color-em)' }} to='/configure-test'>
					Here
				</Link>
			</p>
		</>
	);
}
