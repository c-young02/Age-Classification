import { useState, useEffect } from 'react';

function useImages() {
	const [images, setImages] = useState([]);
	const start = 0;
	const end = 48;

	const loadImages = () => {
		if (images.length === 0) {
			fetch(`http://localhost:8000/get-validation-images/${start}/${end}`)
				.then((response) => response.json())
				.then((data) => {
					setImages((prevImages) => prevImages.concat(data.images));
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		} else {
		}
	};

	useEffect(() => {
		loadImages();
	}, []);

	return images;
}

export default useImages;
