document.addEventListener('DOMContentLoaded', () => {
    const squares: HTMLDivElement = document.querySelectorAll('.grid div')
    const scoreDisplay: HTMLElement = document.querySelector('span')
    const startBtn: HTMLElement = document.querySelector('.start')

    const width: number = 10
    let currentIndex: number = 0
    let appleIndex: number = 0
    let currentSnake: Array<number> = [2,1,0] // 2 is head, body is 1, 0 is tail
    let direction: number = 1
    let score: number = 0
    let speed: number = 0.9
    let intervalTime: number = 0
    let interval = 0

    // start, restart game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = (score).toString()
        intervalTime = 800
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function that deals with all the move outcomes of the snake
    function moveOutcomes() {
        // deals with snake hitting border and snake hittinh self
        if (
        (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits into itself
        ) {
            return clearInterval(interval)
        }

        const tail = currentSnake.pop() // removes the last bite of the array and shows it
        squares[tail].classList.remove('snake') // removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

        // deals with snake getting the apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = (score).toString()
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    // generate new apple once apple is eaten

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * (squares as any).length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    // assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') // removes the class snake from all the squares

        if(e.keyCode === 39) {
            direction = 1 // if we press the right arrow, the snake will go right one position
        } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back 10 divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press the left arrow, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width // if we press the down arrow, the snake will instantly appear in the div ten divs from where you are now
        }
    }

    document.addEventListener('keydown', control)
    startBtn.addEventListener('click', startGame)
})