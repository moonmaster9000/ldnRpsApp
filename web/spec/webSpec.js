const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    render(){
        return <button>Hello Test</button>
    }
}


describe("Play Form", function () {
    describe("when the request is processed as 'invalid'", function () {
        it("should display INVALID", function () {
            let domFixture = document.createElement("div")
            document.body.appendChild(domFixture)

            let alwaysInvalidRequest = {
                play: function(p1, p2, observer){
                    observer.invalid()
                }
            }

            ReactDOM.render(
                <PlayForm requests={alwaysInvalidRequest}/>,
                domFixture
            )

            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })


    })
})