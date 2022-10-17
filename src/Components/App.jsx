import React, { useState, createContext, useRef} from 'react';
import { Route, Routes, BrowserRouter, Outlet, Link } from 'react-router-dom';
import NewTestForm from './NewTestForm';
import AddQuestion from './AddQuestion';
import CurrentTest from './CurrentTest';
import '../Styles/App.css';
import useLocalstorage from '../Hooks/useLocalstorage';


// LAYOUT OF THE APP

// -> App [fetches, filters, organises questions, currentTestQuestions, currentTestAnswers, timerProgress]

// ------> NewTestForm (provides new test configuration to app component)

// ------> CurrentTest (questions are passed as props, updates answers calling parent function)

// ------> AddQuestion (needs no dependency on other components)

// This navbar function returns the nav component present on top of every page. Includes the links to traverse through the app


function Navbar() {
	function conditionallyStyled(page) {
		return document.location.href.includes(page)?{color:'var(--color-em)', borderBottom: '1px solid var(--color-em)'}:undefined
	}
	// force updating the navbar component by modifying dummy state
	const stateArray = useState(Boolean(false))
	const forcedRender = stateArray[1]




	return (
		<>
			<header>
				<div className='logo'>
					<h1>Quizzo</h1>
				</div>
				<nav onClick={() => {
					forcedRender((prev)=> !prev)
				}}>
					<Link style={conditionallyStyled('configure-test')} to='/configure-test'>New Test</Link>
					<Link style={conditionallyStyled('/test')} to='/test'>Current Test</Link>
					<Link style={conditionallyStyled('add-question')} to='/add-question'>Add Question</Link>
				</nav>
			</header>
			<hr />
			<Outlet />
		</>
	);
}

function fetchQuizData() {
	// the fetch data should be implemented here
	// for now this dummy data will be provided
	return [
		{
			id: 1,
			statement: 'Which of the following topics is of Physics?',
			options: ['Mechanics', 'Bonding', 'Permutations', 'Genetics'],
			type: ['physics', 'mechanics'],
		},
		{
			id: 2,
			statement: 'What is projectile motion?',
			options: ['Motion of object in 2D place', 'Motion of object in 1D place', 'Circular motion of an object', 'Straight line motion of an object'],
			type: ['physics', 'kinematics'],
		},
		{
			id: 3,
			statement: 'What type of isomerism rotates plane polanised light?',
			options: ['Geometrical Isomerism', 'Functional Isomerism', 'Metamerism', 'Positional Isomerism'],
			type: ['chemistry', 'isomerism'],
		},
		{
			id: 4,
			statement: 'What do you call CH3COOH in IUPAC?',
			options: ['Acetic Acid', 'Lactic Acid', 'Carbonic Acid', 'Carboxacid'],
			type: ['chemistry', 'nomenclature'],
		},
	];
}



const quizData = fetchQuizData();
// const questionCount = quizData.length;

const questionTopics = {};
// adding all the topics to the questionTopics object from the quizData
for (let question of quizData) {
	let breaked = false;
	if (!(question?.type[0] in questionTopics)) {
		questionTopics[question.type[0]] = [question.type[1]];
	}

	for (let subtopic of questionTopics[question.type[0]]) {
		if (subtopic === question.type[1]) breaked = true;
	}
	if (!breaked) questionTopics[question.type[0]].push(question.type[1]);
}

export const topicsContext = createContext();
export const questionNoContext = createContext();

// The app component contains links to all the other components/pages using react-router-dom. Links are directed using the <Link/> component
export default function App() {


	// tracking the configuration of test edited by the user
	const [questionNo, setQuestionNo] = useLocalstorage('setQuestionNo', 5);
	const [topics, updateTopics] = useLocalstorage('topics', {});
	// tracking the timer of current test
	const [time, setTime] = useState(0)
	// used to infer whether a test is going on or not
	const [isTestActive, setIsTestActive] = useState(false)
	// creating a variable to keep track of the last timeout used to increment the time variable
	// used to clear timeout when timer has to stop or reseted
	const lastTimeout = useRef(undefined)

	// used for overwriting new topics selected by user to the topics state
	function setTopics(arg) {
		updateTopics((prev) => {
			return {...prev, ...arg}
		})
	}

	//function that increments time every second by 1
	function incrementTime(setTimeVar) {
		setTimeVar((prevTime) => {
			return prevTime+1
		}) 

		lastTimeout.current = setTimeout(() => {
			incrementTime(setTimeVar)
		}, 1000);
	}

	// starting new test
	function startTest() {
		if (questionNo < 5 || questionNo > 40) { window.alert('No. of questions my lie between 5 and 40');  return false}
		if (Object.keys(topics).filter((topic) => {
			return topics[topic]
		}).length < 1) { window.alert('Atleast one of the topics should be selected for the test'); return false}
		
		// Now starting the test
		abortTest()
		setIsTestActive(true)
		incrementTime(setTime)
		return true
	}

	function abortTest() {
		setIsTestActive(false)
		clearTimeout(lastTimeout.current)
		setTime(0)
	}

	return (
		<topicsContext.Provider value={[topics, setTopics]}>
			<questionNoContext.Provider value={[questionNo, setQuestionNo]}>
				<div className='App'>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Navbar />}>
								<Route index element={<NewTestForm topics={questionTopics} onStart={startTest} />} />
								<Route path='/configure-Test' element={<NewTestForm topics={questionTopics} onStart={startTest} />} />
								<Route path='/test' element={<CurrentTest time={time} onAbort={abortTest} isPlaying={isTestActive} />} />
								<Route path='/add-question' element={<AddQuestion />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</div>
			</questionNoContext.Provider>
		</topicsContext.Provider>
	);
}
