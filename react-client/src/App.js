import { useState } from 'react'
import Spinner from './Spinner'

export default function App() {

	const [formData, setFormData] = useState({
		prompt: '',
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

	
	function generateImageRequest() {
		try {

			setShowSpinner(true)
			
			fetch('https://openai-image-generator-flask-backend.onrender.com/generateimage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then(response => {
				if (!response.ok) {
					setShowSpinner(false)
					throw new Error("Image could not be generated")
				}
				return response.json()
			})
			.then(data => {
				setData(data)
				setShowSpinner(false)
			})

		} catch (error) {
			setErrorMessage(error)
		}
	}
	
			
	return (
		<div>
			<main className='container mx-auto mt-12 max-w-2xl bg-white/40 rounded'>
				<form className="p-6 space-y-4 rounded border-gray-800 backdrop-blur-xl">
					
					<textarea
						name="prompt"
						placeholder='Enter prompt...'
						className='rounded w-full text-gray-600 border-gray-400 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 required'
						onChange={handleChange}
						value={formData.prompt}
						></textarea>
			
					<div className='flex space-x-6'>

						<select
							name="size"
							className='rounded border-gray-400 text-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-500 '
							value={formData.size}
							onChange={handleChange}
							>
							<option value="256x256">Small (256x256)</option>
							<option value="512x512">Medium (512x512)</option>
							<option value="1024x1024">Large (1024x1024)</option>
						</select>
					
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

			{errorMessage && <p className='bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3'>{errorMessage}</p>}
			
		</div>
	)
}