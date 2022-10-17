import React from 'react'
import { Link } from 'react-router-dom'

export default function CurrentTest({time, onAbort, isPlaying}) {
	if (isPlaying) {
		return (
			<div onClick={onAbort}>{time}</div>
		)
	}
	return <>
	<h2 style={{color:'grey'}}>Test is not yet started</h2>
	<p style={{textAlign:'center', fontSize:'1.5rem', color:'grey'}}>Try starting a test <Link style={{ color:'var(--color-em)'}} to='/configure-test'>Here</Link></p>
	</>
}
