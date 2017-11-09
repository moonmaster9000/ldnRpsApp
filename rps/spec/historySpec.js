const {Requests, Round} = require("../src/rps")


describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    fdescribe("when rounds have been played", function () {
        it("then it sends the rounds to the observer", function () {
            let requests = new Requests()
            let playRoundObserver = jasmine.createSpyObj("playRoundObserver", ["invalid"])
            let repo = new FakeRoundRepo()

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
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(round){
        rounds.push(round)
    }

    this.findAll= function(){
        return rounds
    }
}

function roundRepoContract(RoundRepoClass){
    fdescribe("round repo", function () {
        let repo

        beforeEach(function () {
            repo = new RoundRepoClass()
        })

        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                expect(repo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                repo.save(new Round())
                expect(repo.isEmpty()).toBe(false)
            })

            it("returns the rounds that have been saved", function () {
                let round = new Round()
                repo.save(round)
                expect(repo.findAll()).toEqual([round])
            })
        })
    })
}

roundRepoContract(FakeRoundRepo)
















