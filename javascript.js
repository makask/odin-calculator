class Calculator{
    
    constructor(primaryDisplay, secondaryDisplay){
        this.primaryDisplay = primaryDisplay;
        this.secondaryDisplay = secondaryDisplay;
        this.clearDisplay();
    }

    clearDisplay(){
        this.currentNumber = "";
        this.previousNumber = "";
        this.operation = undefined;
    }

    appendNumber(number){
        if(this.currentNumber.length > 14) return;
            this.currentNumber += number; 
    }

    addDecimal(){
        if(!this.currentNumber.includes(".")){
            this.currentNumber += ".";
            this.updateDisplay();
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

    getDiplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ""; 
        }else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if(decimalDigits !=null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay
        }
    }

   chooseOperation(operation){
       if(this.currentNumber === "") return;
       if(this.previousNumber !== ""){
         this.compute();
       }
       this.operation = operation;
       this.previousNumber = this.currentNumber;
       this.currentNumber = "";
   }

   compute(){
       let computation;
       let placeHolder;
       const current = parseFloat(this.currentNumber);
       const prev = parseFloat(this.previousNumber);
       if(isNaN(current) || isNaN(prev)) return;
       switch(this.operation){
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
            default:
                return
       }
       this.currentNumber = computation;
       this.operation = undefined;
       this.previousNumber = "";
   }

    updateDisplay(){ 
        this.primaryDisplay.innerHTML = this.getDiplayNumber(this.currentNumber);
        if(this.operation != null){
            this.secondaryDisplay.innerHTML = `${this.getDiplayNumber(this.previousNumber)} ${this.operation}`;
        }else {
            this.secondaryDisplay.innerHTML = "";
        }
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
const equals = document.querySelector(".equals");

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
});

operands.forEach(operand => operand.addEventListener("click", () => { 
    calculator.chooseOperation(operand.innerHTML);
    calculator.updateDisplay();
}));

equals.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});
