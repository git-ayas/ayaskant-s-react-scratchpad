import React from 'react'
import "./DualHandleRangeInput.scss"
interface PropType { }
interface StateType { start: number, end: number, mouseX: number | null, handle: "left" | "right" | null, drag: boolean }

class DualHandleRangeInput extends React.Component<PropType, StateType> {
    RangeRef: React.RefObject<HTMLDivElement>;

    constructor(props: PropType) {
        super(props);
        this.state = { start: 30, end: 60, mouseX: null, handle: null, drag: false }
        this.dragHandler = this.dragHandler.bind(this)
        this.mouseTracker = this.mouseTracker.bind(this)
        this.stopDrag = this.stopDrag.bind(this)
        this.RangeRef = React.createRef()
    }
    componentDidMount() {
        document.addEventListener("mouseup", this.stopDrag)
        document.addEventListener("mousemove", this.mouseTracker)


    }
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.stopDrag)
        document.removeEventListener("mousemove", this.mouseTracker)

    }

    reset() {
        this.setState({ start: 0, end: 100 })
    }
    dragHandler(enable: boolean, handle: "left" | "right" | null) {
        if (enable) {
            switch (handle) {
                case null:
                    return
                default:
                    this.setState({ handle, drag: true })
                    break;
            }
        } else {
            this.setState({ handle: null, drag: false })
        }
    }
    stopDrag() {
        this.dragHandler(false, null)
    }

    mouseTracker(e: any) {
        this.setState({ mouseX: e.clientX })
        const RangeDiv = this.RangeRef.current
        const leftOffset = RangeDiv ? RangeDiv.offsetLeft : 0
        const DivLength = RangeDiv ? RangeDiv.offsetWidth : 0
        const currentHandle = this.state.handle
        const relativeMousePosition = e.clientX - leftOffset
        const percentagePosition = Math.round((100 * relativeMousePosition) / DivLength)
        if (percentagePosition >= 0 && percentagePosition <= 100)
            switch (currentHandle) {
                case "left":
                    if (this.state.drag) {
                        if (percentagePosition < this.state.end) {
                            console.log(`Moving Left Handle: ${percentagePosition}%`)
                            this.setState({ start: percentagePosition })
                        }
                    }

                    break;
                case "right":
                    if (this.state.drag) {
                        if (percentagePosition > this.state.start) {
                            this.setState({ end: percentagePosition })
                            console.log(`Moving Right Handle: ${percentagePosition}%`)
                        }
                    }
                    break;

                default:
                    break;
            }
        console.log(`value: ${percentagePosition}%`,
            {
                leftOffset,
                MousePosition: e.clientX,
                relativeMousePosition,
                reverseCheck: (percentagePosition * DivLength) / 100,
                DivLength
            })

    }


    render() {
        const Range = this.state
        const inverseLeftStyle: React.CSSProperties = { width: `${Range.start}%` }
        const RangeStyle: React.CSSProperties = { width: `${Range.end - Range.start}%` }
        const inverseRightStyle: React.CSSProperties = { width: `${100 - Range.end}%` }
        return (
            <div ref={this.RangeRef} className="dual-handle-range">
                <div style={inverseLeftStyle} className="inverse-range-display"></div>
                <div className="handle" onMouseDown={() => { this.dragHandler(true, "left") }}></div>
                <div style={RangeStyle} className="higlighted-range-display"></div>
                <div className="handle" onMouseDown={() => { this.dragHandler(true, "right") }}></div>
                <div style={inverseRightStyle} className="inverse-range-display"></div>
            </div>
        )
    }
}

export default DualHandleRangeInput
