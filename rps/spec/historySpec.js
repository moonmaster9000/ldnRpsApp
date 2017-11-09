const {Requests} = require("../src/rps")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })

    })
})