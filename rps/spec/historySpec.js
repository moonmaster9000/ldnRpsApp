const {Requests, Round} = require("../src/rps")


describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("then it sends the rounds to the observer", function () {
            let requests = new Requests()
            let playRoundObserver = jasmine.createSpyObj("playRoundObserver", ["invalid"])
            let repo = {
                isEmpty(){},
                findAll(){},
                save(){}
            }

            let observer = jasmine.createSpyObj("observer", ["rounds"])

            requests.playRound("foo", "bar", playRoundObserver, repo)

            requests.getHistory(observer, repo)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("foo", "bar", "invalid")
            ])
        })

    })
})

function FakeRoundRepo(){

}

fdescribe("round repo", function () {
    describe("when no rounds have been saved", function () {
        it("is empty", function () {
            expect(new FakeRoundRepo().isEmpty()).toBe(true)
        })
    })

    describe("when rounds have been saved", function () {
        it("is not empty", function () {

        })

        it("returns the rounds that have been saved", function () {

        })
    })
})
















