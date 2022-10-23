import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../Styles/CurrentTest.css'
import '../Styles/ScoreCard.css'
import { questionsContext, submittedContext } from '../Components/App'



function OptionItem({ question, option }) {

	const [questions, setQuestions] = useContext(questionsContext)
	const [submitted] = useContext(submittedContext)
	
	//correct style
	const styleC = submitted ? question.correct === option ? { color: '#00df00' } : {} : {}
	const styleR = submitted ? question.selected === option ? question.correct !== question.selected ? { color: 'red', textDecoration:'line-through' } : {} : {} : {}

		
	const statement = question.statement;

	return <div className="option" style={{...styleR, ...styleC}}>
		<input checked={question.selected === option} type="radio" name={`${statement}`} id={`${statement}__${option}`} onChange={(e) => {
			// function checking change in value if the current option is selected
			if (e.target.checked === false) return 
			if (submitted) return
			

			setQuestions(questions.map((ques) => {
				if (ques.id !== question.id) return ques
				const quesCopy = {...ques}
				quesCopy.selected = option
				return quesCopy
			}))
		} } />

		<label className='option-label' htmlFor={`${statement}__${option}`}>{option}</label>
	</div>
}

function QuestionDisplay({ question }) {
	

	return <div className="questionItem">


		<div className="question-main-group">
		<span>{question.n}.</span><p className='question-statement'>{question.statement}</p>
		</div>

		
		<div className="options-group">
		{question.options.map((option) => {
			return <OptionItem key={option} question={question} option={option} />
		})}
		</div>

	</div>
}


function ScoreCard({result, onRetest}) {
	let resColor;
	if (result.persentage > 70) resColor = 'green'
	else if(result.persentage > 33) resColor = '#c4c400'
	else if(result.persentage <= 33) resColor = 'red'


	return (
		<div id="scoreCard" className="scoreCard" style={{ borderColor: resColor }}>
		<h3 style={{backgroundColor:resColor}}>Result</h3>
		<div className="inner">
			<div className="percent">
				<span className="percentage" style={{color:resColor}}>{result.persentage}%</span>
				<span className="lightTextUnderPercent">SCORED</span>
			</div>
			<div className="score">


				<table>
					<tbody>
					<tr><td className='fieldName'>Time Taken</td><td className='fieldData'>{result.time}</td></tr>
					<tr><td className='fieldName'>Total Questions</td><td className='fieldData'>{result.total}</td></tr>
					<tr><td className='fieldName'>Attempted</td><td className='fieldData'>{result.attempted}</td></tr>
					<tr><td className='fieldName'>Correct</td><td className='fieldData'>{result.correct}</td></tr>
					<tr><td className='fieldName'>Wrong</td><td className='fieldData'>{result.wrong}</td></tr>
					</tbody>
				</table> 
			</div>
			

			<div className="actions">
				<button onClick={onRetest} className='retest-button'>Retest</button>
				<p>Take the test again with same settings but new questions</p>
			</div>
		</div>
	</div>)
}

export default function CurrentTest({ time, onAbort, isPlaying, topicsCount, onSubmit, result, onRetest}) {

	const [questions] = useContext(questionsContext)
	const [submitted] = useContext(submittedContext)

	function submitTest(e) {
		e.preventDefault();
		setTimeout(()=>{var scrollDiv = document.getElementById("scoreCard").offsetTop;
		window.scrollTo({ top: scrollDiv-50, behavior: 'smooth'});}, 100);
		onSubmit()
	}

	const minutes = time / 60 < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
	const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60
	const formattedTime= `${minutes}:${seconds}`
	
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

				{ submitted && <ScoreCard onRetest={onRetest} result={{...result, time:formattedTime}}/>}

				{ submitted || <header>

					<button id="test-abort-button" onClick={() => {
						if (window.confirm('Are you Sure, You want to Abort the current Test? All the data will be lost.')) onAbort()
					}}>Abort Test</button>
					<div className='timer' >

						{formattedTime}</div>
				</header>}

				<form>
						{questions.map((question) => <QuestionDisplay key={question.id} question={question} />)}

					{submitted
						|| <button className='test-submit-button' type="submit" onClick={submitTest}>Finish Test</button>
					}
						
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
