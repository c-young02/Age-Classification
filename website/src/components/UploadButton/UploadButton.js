import React from 'react';

function UploadButton({ onUpload }) {
	return (
		<div className="d-flex justify-content-center align-items-center">
			<label className="btn btn-secondary">
				Upload Image
				<input type="file" onChange={onUpload} accept="image/*" hidden />
			</label>
		</div>
	);
}

export default UploadButton;
