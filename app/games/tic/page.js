"use client"
import { useState } from 'react';

function Square({ value, onSquareClick }) {
    return (
        <button className="border border-neutral-800 w-16 h-16 lg:w-32 lg:h-32 align-top text-3xl" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className='flex flex-col m-5 items-center w-full'>
            <div className={`flex alert ${winner ? 'alert-success' : ''} text-2xl justify-center rounded-full`}>{status}</div>
            <div className='mt-5 mb-5 flex flex-col'>
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </div>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [botPlay , setBotPlay] = useState(false);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        if (botPlay) {
            const next = nextHistory[currentMove+1]
            let empty = emptyCells(next);
            if (empty.length>0){
                const botMove = miniMax(next,'O',empty.length).index
                next[botMove] = "O"
                const nextHis = [...history.slice(0, currentMove + 1), nextSquares,next];
                setHistory(nextHis);
                setCurrentMove(nextHis.length-1);
            }
        }
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function handleBotChange(e){
        setBotPlay(botPlay=>e.target.checked)
    }

    return (
        <div className="game flex flex-col items-center w-full">
            <div className="game-board flex w-3/5 items-center">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info m-5 flex flex-row items-center">
                <div className='m-5 flex flex-row'>
                    <span className="label-text">Play with Bot </span>
                    <input type="checkbox" className="checkbox ml-2" onChange={handleBotChange} />
                </div>
                <button className="btn btn-primary rounded-full" onClick={() => jumpTo(0)}>{'Reset the Game'}</button>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const emptyCells = (gameCurrent) => {
	let empty = [];
	for (let i = 0; i < gameCurrent.length; i++) {
		if (!gameCurrent[i]) empty.push(i);
	}
	return empty;
}

function miniMax(history,player,depth) {
    const min = (a, b) => {
		return a < b ? a : b;
	}

	const max = (a, b) => {
		return a > b ? a : b;
	}
    const winner = calculateWinner(history)
    if (winner == "X"){
        return { score: -1 }
    }
    if (winner == "O") {
        return { score: 1 }
    }

    let empty = emptyCells(history)
    if (empty.length === 0 || depth === 0) {
        return { score: 0 };
    }

    depth--;

    let movePossibles = [];

    for (let i = 0; i < empty.length; i++) {
        let move = {};
        move.index = empty[i];

        let newGame = history.slice();
        newGame[empty[i]] = player;

		let result = miniMax(newGame, player === "O" ? "X" : "O", depth);
        move.score = result.score;
        movePossibles.push(move);
    }

	let bestMove;
    let bestScore;
    if (player === "O") {
        bestScore = -Infinity;
        for (let i = 0; i < movePossibles.length; i++) {
            bestScore = max(bestScore, movePossibles[i].score);
            if (movePossibles[i].score === bestScore) {
				bestMove = i;
            }
        }
    } else {
        bestScore = Infinity;
        for (let i = 0; i < movePossibles.length; i++) {
            bestScore = min(bestScore, movePossibles[i].score);
            if (movePossibles[i].score === bestScore) {
				bestMove = i;
            }
        }
    }

    return movePossibles[bestMove];
}