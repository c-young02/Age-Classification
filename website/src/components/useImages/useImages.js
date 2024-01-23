import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

// useImages is a custom hook that fetches images from the server
function useImages() {
	// State variables for the images, loading status, and any error
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Start and end indices for the images to fetch
	const start = 0;
	const end = 120;

	// Function to load the images from the server
	const loadImages = () => {
		// Fetch the images from the server
		fetch(
			`${process.env.REACT_APP_API_URL}/get-validation-images/${start}/${end}`
		)
			.then((response) => response.json())
			.then((data) => {
				// Add the fetched images to the state
				setImages((prevImages) => prevImages.concat(data.images));
				// Set loading to false as the images have been loaded
				setLoading(false);
			})
			.catch((error) => {
				// Log the error and set the error state
				console.error('Error:', error);
				setError(error);
				// Set loading to false as the loading process has ended
				setLoading(false);
			});
	};

	// Use the useEffect hook to load the images when the component mounts
	useEffect(() => {
		loadImages();
	}, []);

	// If loading, return a Loading component
	if (loading) {
		return { content: <Loading /> };
	}

	// If there's an error, return an error message
	if (error) {
		return { content: <div>Error: {error.message}</div> };
	}

	// If the images have been loaded successfully, return them
	return { images };
}

export default useImages;
