const App = () => {
	// set all state variables
	const [word, setWord] = React.useState("");
	const [hint, setHint] = React.useState("");
	const [guessCount, setGuessCount] = React.useState(0);
	const [guessLimit, setGuessLimit] = React.useState(word.length + 2);
	const [incorrectGuessHistory, setIncorrectGuessHistory] = React.useState([]);
	const [correctLetterCount, setCorrectLetterCount] = React.useState(0);
	const [gameActive, setGameActive] = React.useState(false);


	// Fetch a new word and hint when the component mounts
	React.useEffect(() => {
		setNewWord();
	}, []);

	// Handle keydown events to check if the pressed key is a letter in the word
	React.useEffect(() => {
		function localHandleKeyDown(event) {
			const letterInWord = handleKeyDown(event);

			// If the letter is in the word, reveal it in the tiles
			if (letterInWord) {
				handleLetterInWord(event.key.toUpperCase());
			} else {
				handleLetterNotInWord(event.key.toUpperCase());
			}

		}

		document.addEventListener("keydown", localHandleKeyDown);

		return () => {
			document.removeEventListener("keydown", localHandleKeyDown);
		};
	}, [word, incorrectGuessHistory, guessCount]);

	// Check if the guess count has reached the guess limit
	React.useEffect(() => {
		if (guessCount == guessLimit) {
			setTimeout(() => { // delay alert until after the DOM has visually updated.
				alert("Game Over! You've reached the guess limit. The word was: " + word);
				setNewWord(); // Reset the game with a new word
			}, 700);
		}
	}, [guessCount]);

	// Check if all letters in the word have been guessed correctly
	React.useEffect(() => {
		if (!gameActive) return; 
		console.log(`Correct letters guessed: ${correctLetterCount} out of ${word.length}`);
		
		if (word.length > 0 && correctLetterCount > 0 && correctLetterCount === word.length) {
			setGameActive(false);
			setTimeout(() => { // delay alert until after the DOM has visually updated.
				alert("Congratulations! You've guessed the word correctly.");
				setNewWord(); // Reset the game with a new word
			}, 700);
		}
	}, [correctLetterCount, word]);



	return ( 
		<Backdrop 
			word={word}
			hint={hint}
			guessCount={guessCount}
			guessLimit={guessLimit}
			incorrectGuessHistory={incorrectGuessHistory}
			setGuessCount={setGuessCount}
			setIncorrectGuessHistory={setIncorrectGuessHistory}
			setNewWord={setNewWord}
		/>
	);


	/**
	 * Gets a random word from the json file and sets the word, hint, and guess limit.
	 */
	function setNewWord(){
		fetch("/data/words.json")
			.then(response => response.json())
			.then(data => {
				// Select a random word from the fetched data
				const wordsArray = Array.from(data);
				const randomIndex = Math.floor(Math.random() * wordsArray.length);
				const selectedWord = wordsArray[randomIndex];
				setWord(selectedWord.word);
				setHint(selectedWord.hint);
				setGuessLimit(selectedWord.word.length + 2);
				setGuessCount(0);
				setIncorrectGuessHistory([]);
				setCorrectLetterCount(0);
				resetTiles();
				setGameActive(true);
			})
			.catch(error => console.error("Error fetching word:", error));
	}

	/**
	 * Handles the keydown event to check if the pressed key is a letter in the word.
	 * @param {*} event 
	 * @returns whether the pressed key is in the word or not
	 */
	function handleKeyDown(event) {
		const letter = event.key.toUpperCase();
		let isLetterInWord = false;
		
		// Check if the pressed key is a letter
		if (/^[a-z]$/i.test(letter)) {
			// Check if the letter is in the word
			if (word.toUpperCase().includes(letter)) {
				isLetterInWord = true;
			}
		}

		return isLetterInWord;
	}

	/**
	 * Resets all tile letters to hidden.
	 */
	function resetTiles() {
		const tileLetters = document.querySelectorAll(".tile-letter");
		tileLetters.forEach((tile) => {
			tile.classList.add("hidden");
		});
	}


	/** * Reveals the letter in the tiles if it is present in the word.
	 * @param {string} letter - The letter to reveal in the tiles.
	 */
	function handleLetterInWord(letter){
		const tileLetters = document.querySelectorAll(".tile-letter");
		tileLetters.forEach((tile) => {
			// Check if the tile's letter matches the pressed letter
			if (tile.textContent.toUpperCase() === letter) {
				// Check if the letter is already counted as correct
				if (tile.classList.contains("hidden")) {
					tile.classList.remove("hidden");
					setCorrectLetterCount(prevCount => prevCount + 1);
				}

			}
		});
	}

	function handleLetterNotInWord(letter) {
		// check if the letter is already in the incorrect guess history
		if (incorrectGuessHistory.includes(letter)) {
			return; // If the letter is already guessed, do nothing
		}

		if (/^[a-z]$/i.test(letter)) {
			setGuessCount(prevCount => prevCount + 1);
			setIncorrectGuessHistory(prevHistory => [...prevHistory, letter]);
		}
	}
}

//render content
ReactDOM.render(<App />,document.getElementById("body"));

