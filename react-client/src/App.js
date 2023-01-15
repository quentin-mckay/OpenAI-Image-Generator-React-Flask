import { useState, useEffect } from 'react'

export default function App() {

	const [formData, setFormData] = useState({
		prompt: 'snowflake with hat',
		size: '512x512'
	})

	// holds data received from the server
	// example: { success: True, image_url: 'http://...' }
	const [data, setData] = useState({})

	const [showSpinner, setShowSpinner] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	// update form data
	function handleChange(event) {
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value
			}
		})
	}

	// iterate over object, returns an array of arrays [[key, value], [key, value]]
	// const fruits = Object.entries(data).map(([key, value]) => {
	// 	return <p>{key} {value}</p>
	// })

	// useEffect(() => {
		

		
	// }, [])

	// function handleSubmit(event) {
	// 	// event.preventDefault()
	// }

	// function fetchtest() {
	// 	console.log(prompt)

	// 	fetch('/randomword')
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setData(data)
	// 			console.log(data)
	// 		})
	// }

	// sending post request with json body
	// as an alternative to using form action and form data
	// not sure which one is better (perhaps this way is more modern?)
	// function posttest() {
	// 	console.log('sent post request')
	// 	fetch('/posttest', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			prompt,
	// 			size
	// 		})
	// 	})
	// }
	
	function generateImageRequest() {
		try {

			setShowSpinner(true)
			
			fetch('/generateimage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setData(data)
			})
		} catch (error) {
			
		}
	}
		// fetch('/generateimage')
		// 	.then(res => res.json())
		// 	.then(data => {
			// 		setImageUrl(data.image_url)
			// 		console.log(data)
			// 	})
			
	return (
		<main className='container mx-auto mt-6 bg-white'>

			<form className="flex flex-col items-center p-6 space-y-4 bg-gray-200 rounded border-gray-800">
				{/* <input
					type="text"
					placeholder='Prompt'
					name="prompt"
					value={prompt}
					onChange={e => setPrompt(e.target.value)}
				/> */}
				<textarea
					name="prompt"
					// cols="30" rows="2"
					placeholder='Prompt'
					className='rounded w-full'
					onChange={handleChange}
					value={formData.prompt}
					></textarea>
					
				<select 
					name="size" 
					className='rounded'
					value={formData.size}
					onChange={handleChange}
					>
					<option value="256x256">Small (256x256)</option>
					<option value="512x512">Medium (512x512)</option>
					<option value="1024x1024">Large (1024x1024)</option>
				</select>
		
				{/* <button onClick={posttest}>Post Test</button> */}
		
				<input
					onClick={generateImageRequest}
					type="button"
					value="Generate Image"
					className='border border-gray-500 rounded p-2 px-4 hover:cursor-pointer hover:bg-green-300 transition'/>
			</form>

		{data.image_url && <img src={data.image_url} alt="generated" className='w-full p-6' />}
	
		</main>
	)
}