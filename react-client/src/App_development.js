import { useState, useEffect } from 'react'
import Spinner from './Spinner'

export default function App() {

	const [formData, setFormData] = useState({
		prompt: 'bunny in the style of picasso',
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
			console.log('showing spinner')
			
			fetch('/generateimage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				setData(data)
				setShowSpinner(false)
				console.log('hiding spinner')
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
		<div>
			<main className='container mx-auto mt-12 max-w-2xl bg-white/50 rounded'>
				<form className="p-6 space-y-4 rounded border-gray-800">
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
						placeholder='Type a prompt...'
						className='rounded w-full text-gray-500 border-gray-400 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500'
						onChange={handleChange}
						value={formData.prompt}
						></textarea>
			
					<div className='flex space-x-2'>
						<select
							name="size"
							className='rounded border-gray-400 text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-500 '
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
							className='w-full border border-gray-500 rounded p-2 px-4 font-bold text-white
							border-none bg-green-600 hover:cursor-pointer hover:bg-green-500 active:bg-green-400 transition'/>
					</div>
				</form>
			
				{data.image_url && <img src={data.image_url} alt="generated" className='w-full p-6 pt-0' />}
			</main>

			{showSpinner && <Spinner />}
			{/* <p>{showSpinner}</p> */}
		</div>
	)
}