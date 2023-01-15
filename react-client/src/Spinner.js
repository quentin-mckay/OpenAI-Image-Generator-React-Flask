
export default function Spinner() {
	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
			<div className="w-36 h-36 rounded-full animate-spin
					border-y-8 border-solid border-blue-500 
					border-t-transparent shadow-md"></div>
		</div>
	)
}
