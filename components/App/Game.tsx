'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Game() {
	const [gameOver, setGameOver] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const image = '/normal-sol1.png';

	const resetGame = () => {
		setGameOver(false);
		const imageElement = document.getElementById('sol-image');
		const obstacleElement = document.getElementById('obstacle');
		if (imageElement) {
			imageElement.style.top = '250px';
		}
		if (obstacleElement) {
			obstacleElement.style.right = '0';
		}
	};

	const startGame = () => {
		setGameStarted(true);
		resetGame();
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === 'Space') {
				if (!gameStarted) {
					startGame();
				} else if (gameOver) {
					resetGame();
				} else {
					const imageElement = document.getElementById('sol-image');
					if (imageElement) {
						imageElement.style.transition = 'top 0.5s';
						imageElement.style.top = '150px';
						setTimeout(() => {
							imageElement.style.top = '250px';
						}, 500);
					}
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [gameStarted, gameOver]);

	useEffect(() => {
		let animationFrameId: number;

		const checkCollision = () => {
			const player = document.getElementById('sol-image');
			const obstacle = document.getElementById('obstacle');

			if (player && obstacle) {
				const playerRect = player.getBoundingClientRect();
				const obstacleRect = obstacle.getBoundingClientRect();

				if (
					playerRect.right > obstacleRect.left &&
					playerRect.left < obstacleRect.right &&
					playerRect.bottom > obstacleRect.top &&
					playerRect.top < obstacleRect.bottom
				) {
					setGameOver(true);
				}
			}
		};

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);
			checkCollision();
		};

		animate();

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	return (
		<div className="w-full h-[50vh]">
			<div 
				className="w-[600px] bg-cover bg-[url('/bg-game2.jpg')] relative h-[300px] border overflow-hidden border-black m-auto"
				tabIndex={0} 
			>
				{!gameStarted && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white text-2xl">
						<div>Welcome to the Game!</div>
						<button 
							onClick={startGame} 
							className="mt-4 px-4 py-2 bg-white text-black rounded"
						>
							Start Game
						</button>
					</div>
				)}
				{gameStarted && gameOver && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white text-2xl">
						<div>Game Over</div>
						<button 
							onClick={resetGame} 
							className="mt-4 px-4 py-2 bg-white text-black rounded"
						>
							Retry
						</button>
					</div>
				)}
				{gameStarted && (
					<>
						<Image id='sol-image' src={image} alt='sol' className='relative top-[250px]' width={50} height={100}/>
						<img 
							id='obstacle'
							className={`absolute top-[250px] w-[50px] h-[50px] ${gameOver ? '' : 'animate-move-left'}`} 
							src="https://play.rosebud.ai/assets/A%20simple%20wooden%20obstacle,%20like%20a%20log%20or%20plank.png?YHfQ" 
							alt=""
							style={{ right: 0 }}
						/>
					</>
				)}
				<style jsx>{`
					@keyframes move-left {
						0% { right: 0; }
						100% { right: 100%; }
						}
						.animate-move-left {
							animation: move-left 2s linear infinite;
							}
							`}</style>
			</div>
		</div>
	)
}
export default Game
