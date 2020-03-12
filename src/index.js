const innerBracketsReg = /\(([^\(\)]+)\)/;

function expressionCalculator(expr) {
    while (expr.match(innerBracketsReg)) {
        const innerBracketsExpr = expr.match(innerBracketsReg);
        resultInsideBrackets = evaluateLinearExpr(innerBracketsExpr[1]);

        expr = expr.replace(innerBracketsExpr[0], resultInsideBrackets);
    }
    validateExpr(expr);

    const result = evaluateLinearExpr(expr);

    return Number(result);
}

function evaluateLinearExpr(expr) {
    expr = expr.replace(/\s/g, '');

    divideMultipleExpr = /(\d*\.?\d+(?:[Ee][\+\-]?\d+)?)([/*])(\-?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)/;
    sumSubstrExpr = /(\-?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)([+-])(\-?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)/;

    expr = expr.replace(/(\+-)|(-\+)/g, '-');
    expr = expr.replace(/(\+\+)|(--)/g, '+');

    while (divideMultipleExpr.test(expr)) {
        expr = expr.replace(divideMultipleExpr, (match, a, operator, b) => simpleCalculator(a, operator, b));
    }

    while (sumSubstrExpr.test(expr)) {
        expr = expr.replace(sumSubstrExpr, (match, a, operator, b) => simpleCalculator(a, operator, b));
    }

    return expr;
}

const simpleCalculator = (a, operator, b) => {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '/':
            if (b == 0) {
                throw new Error('TypeError: Division by zero.');
            }
            return a / b;
        case '*':
            return a * b;
    }
};

const validateExpr = (expr) => {
    regExp = /[()]/;
    if (regExp.test(expr)) {
        throw new Error('ExpressionError: Brackets must be paired');
    };
}

module.exports = {
    expressionCalculator
}