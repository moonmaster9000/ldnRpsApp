const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitForm() {
        this.props.requests.play("p1 throw placeholder", "p2 throw placeholder", this)
    }

    tie(){
        this.setState({message: "TIE"})
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    p1Wins(){
        this.setState({message: "P1 Wins!"})
    }

    p2Wins(){
        this.setState({message: "P2 Wins!"})
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

    describe("when the request is processed as 'p1Wins'", function () {
        beforeEach(function () {
            let alwaysP1WinsRequest = {
                play: (p1, p2, observer) => observer.p1Wins()
            }
            renderApp(alwaysP1WinsRequest)
        })

        it("should display P1 Wins!", function () {
            expect(page()).not.toContain("P1 Wins!")
            submitPlayForm()
            expect(page()).toContain("P1 Wins!")
        })
    })

    describe("when the request is processed as 'p2Wins'", function () {
        beforeEach(function () {
            let alwaysP2WinsRequest = {
                play: (p1, p2, observer) => observer.p2Wins()
            }
            renderApp(alwaysP2WinsRequest)
        })

        it("should display P2 Wins!", function () {
            expect(page()).not.toContain("P2 Wins!")
            submitPlayForm()
            expect(page()).toContain("P2 Wins!")
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