import React from 'react';

const Square = ({ value, onClick, className = '' }) => {
	return (
		<div
			className={`${className} h-full w-full shadow-lg text-[40px] bg-[#14bdac] bg-opacity-50 cursor-pointer rounded-sm flex justify-center items-center`}
			onClick={onClick}
		>
			{value}
		</div>
	);
};

export default Square;
