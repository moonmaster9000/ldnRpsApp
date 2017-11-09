function Requests(repo) {
    this.playRound = function (p1Throw, p2Throw, observer) {
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function(observer){
        if (repo.isEmpty()){
            observer.noRounds()
        } else {
            observer.rounds(repo.findAll())
        }
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo) {
    this.process = function () {
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            handleResult("invalid")
        else if (tie())
            handleResult("tie")
        else if (p1Wins())
            handleResult("p1Wins")
        else
            handleResult("p2Wins")
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

    function save(result) {
        repo.save(new Round(p1Throw, p2Throw, result))
    }

    function handleResult(result) {
        save(result)
        observer[result]()
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