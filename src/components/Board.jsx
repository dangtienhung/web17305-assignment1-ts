import React from 'react';
import Square from './Square';

const Board = ({ board, onClick, winner }) => {
	return (
		<div
			className={`grid grid-cols-3 grid-rows-3 gap-5 shadow-lg h-[500px] w-[500px] rounded-sm p-5 ${
				winner ? '!bg-opacity-30 !bg-[#14bdac]' : ''
			}`}
		>
			{board.map((square, index) => {
				return (
					<Square
						key={index}
						value={square}
						onClick={() => onClick(index)}
						className={winner?.includes(index) ? '!bg-[#14bdac] text-white' : ''}
					/>
				);
			})}
		</div>
	);
};

export default Board;
