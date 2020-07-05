Object.defineProperties(Object.prototype, {
    log: {
        value() {
            if(this instanceof Function) {
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

