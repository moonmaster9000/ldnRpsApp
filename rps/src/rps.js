function Requests() {
    this.playRound = function (p1Throw, p2Throw, observer, repo) {
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function(observer, repo){
        if (repo.isEmpty()){
            observer.noRounds()
        } else {
            observer.rounds(repo.findAll())
        }
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo) {
    this.process = function () {
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw)) {
            repo.save(new Round(p1Throw, p2Throw, "invalid"))
            observer.invalid()
        } else if (tie())
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

function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}


module.exports = {
    Requests,
    Round
}