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
        beforeEach(function () {
            let alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            }
            renderApp(alwaysInvalidRequest)
        })

        it("should display INVALID", function () {
            expect(page()).not.toContain("INVALID")
            submitPlayForm()
            expect(page()).toContain("INVALID")
        })
    })
    
    describe("when the request is processed as 'tie'", function () {
        beforeEach(function () {
            let alwaysTieRequest = {
                play: (p1, p2, observer) => observer.tie()
            }
            renderApp(alwaysTieRequest)
        })

        it("should display TIE", function () {
            expect(page()).not.toContain("TIE")
            submitPlayForm()
            expect(page()).toContain("TIE")
        })
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        document.body.appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        cleanupDOM()
    })

    function cleanupDOM(){
        domFixture.remove()
    }

    function renderApp(alwaysInvalidRequest) {
        ReactDOM.render(
            <PlayForm requests={alwaysInvalidRequest}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitPlayForm() {
        document.querySelector("button").click()
    }
})