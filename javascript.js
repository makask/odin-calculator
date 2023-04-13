class Calculator{

    constructor(primaryDisplay, secondaryDisplay){
        this.primaryDisplay = primaryDisplay;
        this.secondaryDisplay = secondaryDisplay;
        this.clearDisplay();
    }

    clearDisplay(){
        this.currentNumber = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    appendNumber(number){
        if(this.currentNumber.length > 14) return;
        this.currentNumber += number;   
    }

    addDecimal(){
        if(!this.currentNumber.includes(".")){
            this.currentNumber += ".";
        }
    }

    delete(){
        this.currentNumber = this.currentNumber.slice(0,-1);
    }

    plusMinus(){
        let number = Number(this.currentNumber);
        if(Math.sign(number)===1){
            this.currentNumber = "-" + number;
        }
        if(Math.sign(number)===-1){
            this.currentNumber = Math.abs(number);
        }
    }

    clear(){
        this.clearDisplay();
    }

    updateDisplay(){
        this.primaryDisplay.innerHTML = this.currentNumber;
    }

}

const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const primaryDisplay = document.querySelector(".display-primary");
const secondaryDisplay = document.querySelector(".display-secondary");
const decimal = document.querySelector(".decimal");
const backspace = document.querySelector(".delete");
const plusMinus = document.querySelector(".plus-minus");
const clear = document.querySelector(".clear");

const calculator = new Calculator(primaryDisplay, secondaryDisplay);

numbers.forEach(number => number.addEventListener("click", () =>{
    calculator.appendNumber(number.innerHTML);
    calculator.updateDisplay();
}));

decimal.addEventListener("click", ()=>{
    calculator.addDecimal();
    calculator.updateDisplay();
});

backspace.addEventListener("click", ()=> {
    calculator.delete();
    calculator.updateDisplay();
});

plusMinus.addEventListener("click", () => {
    calculator.plusMinus();
    calculator.updateDisplay();
});

clear.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})
