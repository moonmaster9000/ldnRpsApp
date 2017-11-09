const {Requests, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests(new FakeRoundRepo()).getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("then it sends the rounds to the observer", function () {
            let playRoundObserver = { tie(){ }, invalid(){ }, p1Wins(){ }, p2Wins(){ }}
            let repo = new FakeRoundRepo()
            let requests = new Requests(repo)

            let observer = jasmine.createSpyObj("observer", ["rounds"])

            requests.playRound("foo", "bar", playRoundObserver)
            requests.playRound("rock", "scissors", playRoundObserver)
            requests.playRound("scissors", "rock", playRoundObserver)
            requests.playRound("scissors", "scissors", playRoundObserver)

            requests.getHistory(observer)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("foo", "bar", "invalid"),
                new Round("rock", "scissors", "p1Wins"),
                new Round("scissors", "rock", "p2Wins"),
                new Round("scissors", "scissors", "tie"),
            ])
        })

    })
})















