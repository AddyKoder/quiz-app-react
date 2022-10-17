import  { useState, useEffect} from 'react';


function getSavedValue(key, initialValue) {
	const value = localStorage.getItem(key)

	if (value) {
		
		return JSON.parse(value)
	}
	return initialValue
}

export default function useLocalstorage(key, initialValue) {
	const [state, setState] = useState(getSavedValue(key, initialValue))


	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [state, key])

	return [state, setState]
}