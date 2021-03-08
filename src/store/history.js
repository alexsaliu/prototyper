export default class History {
    constructor() {
        this.tempHistory = []
        this.history = []
    }

    add(val) {
        this.history.push(val)
        this.tempHistory = []
        return this.current()
    }

    stepBack() {
        if (this.history.length > 1) {
            this.tempHistory.push(this.history.pop())
        }
        return this.current()
    }

    stepForward() {
        if (this.tempHistory.length > 0) {
            this.history.push(this.tempHistory.pop())
        }
        return this.current()
    }

    current() {
        return JSON.parse(JSON.stringify(this.history[this.history.length - 1]))
    }
}
