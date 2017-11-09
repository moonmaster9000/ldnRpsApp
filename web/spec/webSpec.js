const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")
const {Round} = require("rps")

class App extends React.Component {
    render(){
        return <div>
            <PlayForm requests={this.props.requests}/>
            <History requests={this.props.requests}/>
        </div>
    }
}

class History extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount(){
        this.props.requests.getHistory(this)
    }

    rounds(rs){
        this.setState({display: <Rounds rounds={rs}/>})
    }

    noRounds(){
        this.setState({display: <NoRounds/>})
    }

    render(){
        return <div>
            {this.state.display}
        </div>
    }
}

class Rounds extends React.Component {
    render(){
        return <ul>
            {this.props.rounds.map(round =>
                <li>{round.p1Throw} {round.p2Throw} {this.translate(round.result)}</li>
            )}
        </ul>
    }

    translate(result){
        return {
            "invalid": "INVALID"
        }[result]
    }

}

class NoRounds extends React.Component {
    render(){
        return <h1>NO ROUNDS</h1>
    }
}

class PlayForm extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitForm() {
        this.props.requests.play(this.state.p1Throw, this.state.p2Throw, this)
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

    inputChangedHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            {this.state.message}
            <input name="p1Throw" onChange={this.inputChangedHandler.bind(this)}/>
            <input name="p2Throw" onChange={this.inputChangedHandler.bind(this)}/>
            <button onClick={this.submitForm.bind(this)}>PLAY</button>
        </div>
    }
}


describe("Web App", function () {
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

        it("sends the user's input to the play request", function () {
            let playSpy = jasmine.createSpy("playSpy")

            renderApp({play: playSpy})

            changeInput("p1Throw", "foo")
            changeInput("p2Throw", "bar")

            submitPlayForm()
            expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
        })

    })

    describe("when no rounds have been played", function () {
        beforeEach(function () {
            renderApp({getHistory: (observer) => observer.noRounds()})
        })

        it("displays 'NO ROUNDS'", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("when an invalid round has been played", function () {
        beforeEach(function () {
            renderApp({getHistory: (observer) => observer.rounds([new Round("foo", "bar", "invalid")])})
        })

        it("displays the round details", function () {
            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("INVALID")
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

    function renderApp(requests) {
        requests.getHistory = requests.getHistory || function(){}

        ReactDOM.render(
            <App requests={requests}/>,
            domFixture
        )
    }

    function changeInput(name, value) {
        let input = document.querySelector(`[name='${name}']`)
        input.value = value
        ReactTestUtils.Simulate.change(input)

    }

    function page() {
        return domFixture.innerText;
    }

    function submitPlayForm() {
        document.querySelector("button").click()
    }
})