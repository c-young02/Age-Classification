import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

function useImages() {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const start = 0;
	const end = 60;

	const loadImages = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/get-validation-images/${start}/${end}`
			);
			const data = await response.json();
			setImages((prevImages) => prevImages.concat(data.images));
			setLoading(false);
		} catch (error) {
			console.error('Error:', error);
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadImages();
	}, []);

	if (loading) {
		return { content: <Loading message="Loading" /> };
	}

	if (error) {
		return {
			content: (
				<div>
					Error: {error.message}
					<button onClick={loadImages}>Retry</button>
				</div>
			),
		};
	}

	return { images };
}

export default useImages;
