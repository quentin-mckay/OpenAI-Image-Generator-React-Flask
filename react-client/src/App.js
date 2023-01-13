import { useState, useEffect } from 'react'

export default function App() {

	const [data, setData] = useState({})
	const [imageUrl, setImageUrl] = useState({})

	const fruits = Object.entries(data).map(([key, value]) => {
		return <p>{key} {value}</p>
	})

	useEffect(() => {
		fetch('/test')
			.then(res => res.json())
			.then(data => {
				setData(data)
				console.log(data)
			})

		fetch('/generateimage')
			.then(res => res.json())
			.then(data => {
				setImageUrl(data.image_url)
				console.log(data)
			})
	}, [])
	
	return (
		<main>
			<h1>Hello there</h1>
			{fruits}
			
		</main>
	)
}