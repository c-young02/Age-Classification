import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

function useImages() {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const start = 0;
	const end = 48;

	const loadImages = () => {
		fetch(`http://localhost:8000/get-validation-images/${start}/${end}`)
			.then((response) => response.json())
			.then((data) => {
				setImages((prevImages) => prevImages.concat(data.images));
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				setError(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		loadImages();
	}, []);

	if (loading) {
		return { content: <Loading /> };
	}

	if (error) {
		return { content: <div>Error: {error.message}</div> };
	}

	return { images };
}

export default useImages;
