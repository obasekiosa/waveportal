

class Wave {

    constructor(from, message, timestamp) {
        this.from = from;
        this.message = message;
        this.timestamp = new Date(timestamp * 1000);
    }
}