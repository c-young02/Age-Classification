import { useState, useEffect } from 'react';
import Loading from '../components/Common/Loading/Loading';

// This custom hook fetches images from an API and handles the loading and error states.
function useImages() {
	// State for the images
	const [images, setImages] = useState([]);
	// State for the loading status
	const [loading, setLoading] = useState(true);
	// State for any error that occurs
	const [error, setError] = useState(null);

	// Start and end indices for the images to fetch
	const start = 0;
	const end = 60;

	// Function to load images from the API
	const loadImages = async () => {
		try {
			// Fetch images from the API
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/get-validation-images/${start}/${end}`
			);
			const data = await response.json();
			// Add the fetched images to the current images
			setImages((prevImages) => prevImages.concat(data.images));
			// Set loading to false after the images have been fetched
			setLoading(false);
		} catch (error) {
			// Log the error and set the error state
			console.error('Error:', error);
			setError(error);
			// Set loading to false even if an error occurred
			setLoading(false);
		}
	};

	// Use the useEffect hook to load the images when the component mounts
	useEffect(() => {
		loadImages();
	}, []);

	// If loading, return a Loading component
	if (loading) {
		return { content: <Loading message="Loading" /> };
	}

	// If there was an error, return an error message and a retry button
	if (error) {
		return {
			content: (
				<div>
					There was an error loading the images{' '}
					<button onClick={loadImages}>Retry</button>
				</div>
			),
		};
	}

	// If the images have been loaded successfully, return the images
	return { images };
}

export default useImages;
