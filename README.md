# Guess it!
This is a mini word guessing game inspired by Hangman — but without the hanging. <br>
Instead, players are given a helpful hint and try to guess the hidden word letter by letter. Each incorrect guess adds to the count, and once you reach the limit, the game is over and the word is revealed. If you guess all letters correctly before running out of attempts, you win and move on to the next word.

I built this project using **React (via CDN)** to practice state management and dynamic UI updates without a full build system. It was also a fun exercise in handling keyboard events, managing game logic, and structuring small interactive apps.

## 🚀 Features

* Random words loaded from a JSON file, each paired with a helpful hint.
*  Interactive UI that reveals correctly guessed letters.
*  Keeps track of incorrect guesses and displays remaining attempts.
*  Simple keyboard input — just type letters to play.
*  Automatically resets with a new word after winning or losing.

## 🛠️ Built with
* React.js (via CDN)
* CSS
* HTML

## 💭 What I Learned

- How to use **React hooks (`useState`, `useEffect`)** to manage state and side effects in a small interactive app.
- Debugging tricky **React state update timing issues**, especially when multiple state variables depend on each other.
- The importance of **cleanup function**, and how they help reduce bugs, and other errors.
- Handling **keyboard input** and filtering key presses to only respond to letters.
- Designing and controlling **game state** (like tracking correct guesses, incorrect guesses, and resetting for new rounds).
- Using **timeouts** to let the DOM update before showing alerts, to ensure smoother user experience.
- Working with **external JSON data** to dynamically load game content.

>[!NOTE]
>Looking back, this project could also benefit from using hooks like `useReducer` for cleaner state management as the game grows, or `useCallback` to optimize performance on frequent re-renders.


## 🎥 Preview
https://github.com/user-attachments/assets/ed04a4a8-c0a7-426b-b41c-a892fa2e083c

## ⚙️ How to Run
1. Clone the repository.
2. Navigate to `index.html` and open it in your browser.


## 📁 JSON Word File
The word list is stored in data/words.json and should look like:
```
[
  {"word": "frog", "hint": "small green jumper"},
  {"word": "forest", "hint": "full of trees"},
  {"word": "apple", "hint": "keeps the doctor away"}
]
```
You can easily extend or customize this list by adding more `{ "word", "hint" }` objects.

## 💡Future Improvements
* Include a confetti or animation effect when winning
* Track total wins and losses over multiple rounds
* Make it easier to swap out themes or word sets (like science words, cities, movies)
* **Optimize the code with additional React hooks**, like `useReducer` for cleaner state transitions or `useCallback` / `useMemo` to prevent unnecessary re-renders.

