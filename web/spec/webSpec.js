const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitForm() {
        this.setState({message: "INVALID"})
    }

    render() {
        return <div>
            {this.state.message}
            <button onClick={this.submitForm.bind(this)}>PLAY</button>
        </div>
    }
}


describe("Play Form", function () {
    describe("when the request is processed as 'invalid'", function () {
        it("should display INVALID", function () {
            let domFixture = document.createElement("div")
            document.body.appendChild(domFixture)

            let alwaysInvalidRequest = {
                play: function (p1, p2, observer) {
                    observer.invalid()
                }
            }

            ReactDOM.render(
                <PlayForm requests={alwaysInvalidRequest}/>,
                domFixture
            )

            expect(domFixture.innerText).not.toContain("INVALID")
            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })


    })
})