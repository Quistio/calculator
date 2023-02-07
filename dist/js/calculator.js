let n1 = null, n2 = null;
let valueVisor = '', n1Text = '', n2Text = '', lastOperation = '';
let isOperation = false, isNegative = false;
const regNum = new RegExp('[0-9]');
let visor = $('.calculator-values');
let visorHistory = $('.calculator-history');
let lastButtonValue = '';

$(document).ready(function () {
    $('.calculator-buttons-body').on("click", function (event) {
        let button = $(this);
        let buttonValue = button.text();

        processingValueButton(buttonValue);

    });
});

$(document).keypress(function (event) {
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '48') {

    }
});

function processingValueButton(buttonValue) {

    if (isValueClear(buttonValue)) {
        processingClear();
    } else {
        if (!(isValueEqual(buttonValue) && isValueOperation(lastButtonValue))) {
            if (isValueOperation(buttonValue) && isValueOperation(lastButtonValue) && n1 != null) {
                valueVisor = valueVisor.substring(0, valueVisor.length - 1) + buttonValue;
                visor.text(valueVisor);
                lastOperation = buttonValue;
                console.log("2");
            } else {

                if ((isValueOperation(buttonValue) || isValueEqual(buttonValue)) && n1 == null && !isValueSubtract(buttonValue)) {
                    visor.text("Operação inválida");
                } else {
                    if (n1 == null && isValueSubtract(buttonValue) && isNegative == false) {
                        isNegative = true;
                        valueVisor = valueVisor + buttonValue;
                        visor.text(valueVisor);
                        console.log("1");
                    } else {
                        if (isValueOperation(buttonValue) && n2 == null) {
                            if (isNegative == false) {
                                valueVisor = valueVisor + buttonValue;
                                visor.text(valueVisor);
                                lastOperation = buttonValue;
                            }
                        } else {
                            if (isValueRestart(buttonValue)) {
                                Restart();
                            } else {
                                if (isValueOperation(buttonValue) || isValueEqual(buttonValue)) {
                                    calculeValue(buttonValue);
                                }

                                if (isValueNumber(buttonValue) || isValueDecimal(buttonValue)) {
                                    processingValue(buttonValue);
                                }
                            }

                        }
                    }
                }
            }
            lastButtonValue = buttonValue;
        }
    }
}

function isValueOperation(value) {
    let isOperation = false;
    if (value == 'x' || value == '÷' || value == '-' || value == '+') {
        isOperation = true;
    }
    return isOperation;
}

function isValueNumber(values) {
    let isNumber = false;
    if (values.match(regNum)) {
        isNumber = true;
    }
    return isNumber;
}

function isValueDecimal(value) {
    let isDecimal = false;
    if (value == '.') {
        isDecimal = true;
    }
    return isDecimal;
}

function isValueRestart(value) {
    let isRestart = false;
    if (value == 'AC') {
        isRestart = true;
    }
    return isRestart;
}

function isValueClear(value) {
    let isClear = false;
    if (value == 'DEL') {
        isClear = true;
    }
    return isClear;
}

function isValueEqual(value) {
    let isEqual = false;
    if (value == '=') {
        isEqual = true;
    }
    return isEqual;
}

function isValueSubtract(value) {
    let Subtract = false;
    if (value == '-') {
        Subtract = true;
    }
    return Subtract;
}

function calculeValue(buttonValue) {

    if (lastOperation == '÷' && n2 == 0) {
        Restart();
        visor.text("impossível divisão por zero");
    } else {
        if (n1 != null && n2 != null) {
            switch (lastOperation) {
                case 'x':
                    n1 = n1 * n2;
                    break;
                case '÷':
                    n1 = n1 / n2;
                    break;
                case '-':
                    n1 = n1 - n2;
                    break;
                case '+':
                    n1 = n1 + n2;
                    break;
            }
            n2 = null;
            n1Text = n1.toString();
            n2Text = '';
            visorHistory.text(valueVisor);
        }

        if (!isValueEqual(buttonValue)) {
            valueVisor = n1 + buttonValue
        } else {
            valueVisor = n1.toString();
        }
        visor.text(valueVisor);

        lastOperation = buttonValue;
    }
}

function processingClear() {

    if (n2Text != '') {
        if (n2Text.length = 1) {
            n2Text = '';
            n2 = null;
        } else {
            n2Text = n2Text.substring(0, n2Text.length - 1);
            n2 = Number(n2Text);
        }
    } else {
        if (valueVisor.length > 0) {
            if (isValueOperation(valueVisor.substring(valueVisor.length - 1))) {
                lastOperation = '';
            } else {
                if (n1Text != '') {
                    if (n1Text.length = 1) {
                        n1Text = '';
                        n1 = null;
                    } else {
                        n1Text = n1Text.substring(0, n1Text.length - 1);
                        n1 = Number(n1Text);
                    }
                }
            }
        }
    }
    valueVisor = valueVisor.substring(0, valueVisor.length - 1);
    visor.text(valueVisor);

    if (valueVisor.length > 0) {
        lastButtonValue = valueVisor.substring(valueVisor.length - 1);
    } else {
        visor.text('0');
        lastButtonValue = '';
    }

}

function processingValue(buttonValue) {

    let isDecimal = isValueDecimal(buttonValue);

    let value = buttonValue;

    if (!isValueOperation(lastOperation)) {

        if (n1Text == '' && isDecimal) {
            value = '0.';
        }

        n1Text = n1Text + value;
        n1 = Number(n1Text);

        if (isNegative) {
            isNegative = false;
            n1 = n1 * -1;
        }
    } else {
        if (n2Text == '' && isDecimal) {
            value = '0.';
        }

        n2Text = n2Text + value;
        n2 = Number(n2Text);
    }

    valueVisor = valueVisor + value;
    visor.text(valueVisor);
}

function Restart() {
    visor.text("0");
    visorHistory.text("");
    n1 = null;
    n2 = null;
    n1Text = '';
    n2Text = '';
    lastOperation = '';
    lastButtonValue = '';
    valueVisor = '';
}
