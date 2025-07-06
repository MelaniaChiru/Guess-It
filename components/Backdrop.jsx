const Backdrop = ({word, hint, guessCount, guessLimit, incorrectGuessHistory, setGuessCount, setIncorrectGuessHistory, setNewWord}) => {
	return (
		<div className="backdrop">
			<h1>Guess It!</h1>
			<p>	Guess the word by typing letters on your keyboard.</p>
			<Divider></Divider>
			<div className="tiles-wrapper">
				{/* Splitting word into array of letters */}
				{word.split("").map((letter) => (
					<Tile letter={letter} />
				))}
			</div>

			<div className="text-content">
				<p className="hint">Hint: {hint}</p>
				<p className="guess-count">Incorrect guesses: {guessCount}/{guessLimit}</p>
				<div className="incorrect-guess-history">
					<p> Missed guesses: 
						{incorrectGuessHistory.map((letter, index, array) =>{
							if (index === array.length - 1) {
								return <span className="guess-letter"> {letter}</span>
							} else {
								return <span className="guess-letter"> {letter},</span>
							}
						})}
					</p>
				</div>
			</div>

			<Button
				label="New Word"
				onClick={setNewWord}
			/>
		</div>
	);
}