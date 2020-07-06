Object.defineProperties(Object.prototype, {
    log: {
        value() {
            if('toConsole' in this) {
                this.toConsole()
            }
            else if(this instanceof Function) {
                console.log(this(...arguments))
            }
            else {
                console.log(this.valueOf())
            }
        }
    },
    getPrimitiveWrapper: {
        value() {
            return this
        }
    }
});

