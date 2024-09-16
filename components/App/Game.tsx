'use client'
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import IDL from "./idl.json"
import {Something} from "./types"
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';
import * as anchor from "@coral-xyz/anchor";
import {toast, Toaster} from "sonner"

const idlObject = JSON.parse(JSON.stringify(IDL))


function Game() {
	const [gameOver, setGameOver] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const image = '/normal-sol1.png';
	const [staked, setStaked] = useState(false);
	const {publicKey} = useWallet();
	const wallet = useWallet();
	const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

	const getProgram = () => {
		const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions())
		setProvider(provider)
		const program = new Program<Something>(idlObject, provider)
		return {program, provider}
	}


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


	const Stake = async () => {
		const stakeAmount = new anchor.BN(0.25 * LAMPORTS_PER_SOL);

		if(publicKey){
		const {program, provider} = getProgram()
		const [userStatePDA] = PublicKey.findProgramAddressSync(
			[Buffer.from("user_state"), publicKey.toBuffer()],
			program.programId
		  );

		const [stakingPoolPDA] = PublicKey.findProgramAddressSync(
		  [Buffer.from("staking_pool")],
		  program.programId
		);

		const [stakingPoolVaultPDA] = PublicKey.findProgramAddressSync(
			[Buffer.from("staking_pool_vault")],
			program.programId
		);

		  try{
			await program.methods.stake(stakeAmount)
		  .accountsStrict({
			user: publicKey,
			userState: userStatePDA,
			stakingPool: stakingPoolPDA,
			stakingPoolVault: stakingPoolVaultPDA,
			systemProgram: SystemProgram.programId,
		  }).rpc();
		  setStaked(true)
		  toast.success("Staked Successfully")
		  }catch(err:any){
			console.log(err)
			toast.error(`Failed with error ${err.message}`)
		  }
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === 'Space') {
				e.preventDefault(); // Prevent default space bar behavior
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
							imageElement.style.top = '240px';
						}, 500);
					}
				}
			}
		};

		// Add event listener to the document instead of window
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
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
		<div className="w-full my-10 h-[50vh] flex flex-col items-center justify-center hidden sm:flex">
			<div
				className="w-full max-w-[600px] bg-cover bg-[url('/bg-game2.jpg')] relative h-[300px] border-4 border-yellow-400 rounded-lg overflow-hidden shadow-lg m-auto"
				tabIndex={0}
				onFocus={() => document.body.style.overflow = 'hidden'}
				onBlur={() => document.body.style.overflow = 'auto'}
			>
				{!gameStarted && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white text-2xl">
						<div className="text-3xl font-bold mb-4">Welcome to the Game!</div>
						<div className="text-lg  mb-4">Press SPACE to jump and avoid obstacles</div>
						<div className='flex'>
							<button
								onClick={staked  ? startGame : Stake}
								disabled={!publicKey}
								className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300"
							>
								{staked ? "Start Game" : "Stake 0.25 SOL(devnet) to start playing"}
							</button>
						</div>
					</div>
				)}
				{gameStarted && gameOver && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white text-2xl">
						<div className="text-3xl font-bold mb-4">Game Over</div>
						<div className="text-lg mb-4">Press SPACE to play again</div>
						<button
							onClick={resetGame}
							className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300"
						>
							Retry
						</button>
					</div>
				)}
				{gameStarted && (
					<>
						<Image id='sol-image' src={image} alt='sol' className='relative top-[240px]' width={50} height={100} />
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
			<div className="mt-4 text-white text-center text-lg">
				<p>Press SPACE to jump and avoid obstacles</p>
				<p>Click the game area to focus, then use SPACE to play</p>
			</div>
			<Toaster />
		</div>
	)
}
export default Game
