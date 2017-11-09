function Requests() {
    this.playRound = function (p1Throw, p2Throw, observer) {
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer) {
    this.process = function () {
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            observer.invalid()
        else if (tie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    const [ROCK, SCISSORS, PAPER] = ["rock", "scissors", "paper"]

    function invalidThrow(aThrow) {
        return ![ROCK, SCISSORS, PAPER].includes(aThrow)
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return(
            p1Throw === ROCK     && p2Throw === SCISSORS ||
            p1Throw === SCISSORS && p2Throw === PAPER    ||
            p1Throw === PAPER    && p2Throw === ROCK
        )
    }
}

module.exports = {
    Requests
}