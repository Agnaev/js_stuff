require('./Common_stuff.js');

console.log(5..getPrimitiveWrapper())

function Matrix(matrix = []) {
    if(Matrix.isMatrix(matrix)) {
        matrix = matrix.matrix;
    }
    else if (!Array.isArray(matrix)) {
        matrix = []
    }
    
    this.matrix = matrix;
}

Matrix.isMatrix = function (isMatrix) {
    return isMatrix?.__proto__ === Matrix.prototype;
}

Matrix.prototype.Multiple = function (b) {
    if (!Matrix.isMatrix(b)) {
        return new TypeError('Argument must be matrix!');
    }
    else if(this.matrix[0].length !== b.matrix.length) {
        return new TypeError(`It is impossible to multiply two arrays since the number of columns in the first matrix is not equal to the number of rows in the second matrix.`)
    }

    const res = new Matrix;
    for (let i = 0; i < b.matrix[0].length; i++) {
        res.matrix.push(new Array(b.matrix[0].length).fill(0))
    }
    for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < b.matrix[0].length; j++) {
            for (let k = 0; k < b.matrix.length; k++) {
                res.matrix[i][j] += this.matrix[i][k] * b.matrix[k][j]
            }
        }
    }
    return res;
}

Matrix.prototype.Amount = function(b_matrix) {
    if(this.matrix.length !== b_matrix.matrix.length || this.matrix[0].length !== b_matrix.matrix[0].length) {
        return new TypeError('Two matrixes cannot be added.')
    }
    const result = new Matrix;
    for(let i = 0; i < this.matrix.length; i++) {
        result.matrix.push([])
        for(let j = 0; j < this.matrix[0].length; j++) {
            result.matrix[i].push(this.matrix[i][j] + b_matrix.matrix[i][j])
        }
    }
    return result;
}

Matrix.prototype.toConsole = function() {
    console.log(this.matrix.reduce(
        (res, item) => res + item.join(' ') + '\r\n', 
        ''
    ))
}

const a = new Matrix([[2, -3, 1], [5, 4, -2]])
const b = new Matrix([[-7, 5], [2, -1], [4, 3]])

a.Multiple(b).log()

const a1 = new Matrix([[1, 0], [0, 1]]);
const b1 = new Matrix([[0, 1], [1, 0]])

a1.Amount(b1).log()


