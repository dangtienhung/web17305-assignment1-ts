import React, { useEffect, useState } from 'react';

import Board from './Board';
import { toast } from 'react-toastify';
import { winnerCaculator } from '../utils/hooks';

const Game = () => {
	/* state */
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [timer, setTimer] = useState(0); // đếm thời gian chơi
	/* winner */
	const winner = winnerCaculator(board);

	/* handle Click */
	const handleClick = (index) => {
		const boardCopy = [...board];
		if (winner || boardCopy[index]) return;
		boardCopy[index] = xIsNext ? 'X' : 'O';
		setBoard(boardCopy);
		setXIsNext(!xIsNext);
		setTimer(0);
	};

	/* handle reset */
	const handleReset = () => {
		setBoard(Array(9).fill(null));
		setXIsNext(true);
		setTimer(0);
	};
	useEffect(() => {
		if (winner && winner.xIsNext) {
			toast.success(`Winner is ${winner.xIsNext}`);
		}
	}, [winner, xIsNext]);

	/* handle timer */
	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 3000);
		if (timer > 3) {
			// choose a quare random number
			const empty = board
				.map((square, index) => {
					console.log('🚀 ~ file: Game.jsx:46 ~ .map ~ square:', square);
					if (!square) {
						return index;
					}
				})
				.filter((item) => item !== undefined);
			const random = Math.floor(Math.random() * empty.length);
			const randomIndex = empty[random];
			handleClick(randomIndex);
		}
		if (timer > 3) {
			setTimer(0);
		}
		return () => clearInterval(interval);
	}, [timer, winner]);

	return (
		<div className="flex gap-5 transition-all duration-200">
			<Board board={board} onClick={handleClick} winner={winner?.cell} />
			<button className="absolute top-5 left-5 bg-[#14bdac] text-white shadow-sm duration-200 transition-all py-2 px-6 rounded-sm text-2xl">
				Time: {timer}
			</button>
			{winner && (
				<>
					<button
						onClick={handleReset}
						className="absolute bottom-5 right-5 bg-[#14bdac] text-white shadow-sm duration-200 transition-all py-2 px-6 rounded-sm text-2xl"
					>
						Reset Game
					</button>
				</>
			)}
		</div>
	);
};

export default Game;
