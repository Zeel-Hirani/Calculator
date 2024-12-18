document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".inputanswer");
    const output = document.querySelector(".outputanswer");
    let currentinput = "";
    let currentoutput = "";

    function changedisplay() {
        input.textContent = currentinput;
        output.textContent = currentoutput;
    }

    function clearall() {
        currentinput = "";
        currentoutput = "";
        changedisplay();
    }
    
    function backword(){
        // currentinput = currentinput.slice(0,-1);
        currentinput = currentinput.substring(0, currentinput.length - 1);
        changedisplay();
    }

    function buttonclicking(value) {
        if (value === "c") {
            console.log("clear success");
            clearall();
        } else if (value === "=") {
            calculatrresult();
        }else if(value === "←"){
            console.log("backword success");
            backword();         
        } else {
            currentinput += value;
            changedisplay();
        }
    };

    function display() {
        input.textContent = "please enter ";
        output.textContent = "valid number";
    };

    function calculatrresult() {
        try {
            currentoutput = calcululation(currentinput);
        } catch (error) {
            currentoutput = "error:_";
        }
        changedisplay();
    };

    function calcululation(exregex) {
        const regex = /(\d+\.?\d*|\+|\-|\*|\/)/g;
        const values = exregex.match(regex);
        console.log("values",values);
        
        let result = parseFloat(values[0]);
        let operator = ""; 

        for (let i = 1; i < values.length; i++) {
            const value = values[i];
            console.log(value,"value")
            if (!isNaN(value)) {
                const number = parseFloat(value);
                console.log("number",number)
                result = switchfunction(result, operator, number);
                console.log("result",result)
            } else {
                operator = value;
            };
        };
        return result;
    };
        

    function switchfunction(num1, operator, num2) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num1 / num2;
            default:
                return num1;
        }
    };

    document.querySelectorAll(".button").forEach(element => {
        element.addEventListener("click", (event) => {
            // console.log(event.target);
            buttonclicking(event.target.value);
        });
    });

    document.addEventListener("keydown", event =>{
        const key = event.key;
        if(key === "Enter"){
            buttonclicking("=")
        }else if(key === "Backspace"){
            buttonclicking("←")
        }else if(key === "Delete"){
            buttonclicking("c")
        }else if(key >= "0" && key <= "9"){
            buttonclicking(key)
        }else if(key == "+" || key == "-" || key == "*" || key == "/" || key == "(" || key == ")" || key == "{" || key == "}" || key == "[" || key == "]"){
            buttonclicking(key)
        }else if( key !== "Shift" && key !== "Ctrl"){
            display()
        }
    })
});

