const {Round} = require("../src/rps")

function roundRepoContract(RoundRepoClass){
    describe("round repo", function () {
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

module.exports = roundRepoContract