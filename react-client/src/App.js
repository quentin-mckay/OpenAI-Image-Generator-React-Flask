import { useState, useEffect } from 'react'

export default function App() {

	const [data, setData] = useState('')

	const [prompt, setPrompt] = useState('snowflake wearing a hat')
	const [size, setSize] = useState('512x512')

	const [imageUrl, setImageUrl] = useState({})


	// iterate over object, returns an array of arrays [[key, value], [key, value]]
	// const fruits = Object.entries(data).map(([key, value]) => {
	// 	return <p>{key} {value}</p>
	// })

	useEffect(() => {
		

		
	}, [])

	function handleSubmit(event) {
		event.preventDefault()
	}

	function fetchtest() {
		console.log(prompt)

		fetch('/randomword')
			.then(res => res.json())
			.then(data => {
				setData(data)
				console.log(data)
			})
	}

	// sending post request with json body
	// as an alternative to using form action and form data
	// not sure which one is better (perhaps this way is more modern?)
	function posttest() {
		console.log('sent post request')
		fetch('/posttest', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt,
				size
			})
		})
	}
	
	function generateImage() {
		fetch('/generateimage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt,
				size
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setData(data)
		})
	}
	// fetch('/generateimage')
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		setImageUrl(data.image_url)
		// 		console.log(data)
		// 	})

	return (
		<main>
			<h1>Hello there</h1>

			<form action="" onSubmit={handleSubmit}>
				<input 
					type="text" 
					placeholder='Prompt'
					autoFocus
					name="prompt"
					value={prompt}
					onChange={e => setPrompt(e.target.value)}
				/>
				
				<button onClick={posttest}>Post Test</button>
				<button onClick={generateImage}>Generate Image</button>
			</form>

			{data.word}

			<img src={data.image_url} alt="" />
			
		</main>
	)
}