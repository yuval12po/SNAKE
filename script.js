function getInput(){
    let userInput = prompt("plese enter a number");
    for(let i = 0; i<userInput;i++){
        if (i % 2 ==0)
            document.writeln(i);

    }

}



getInput();

function squared(){
    let userInput = prompt("plese enter a number");
    let squaedNum =userInput*userInput;
    if(squaedNum % 2 ==0){   
         document.writeln(squaedNum);


    }

}

squared();
 
function getInput(){
    let userInput = prompt("plese enter a number");
    let root = Math.sqrt(userInput);
    document.writeln(root);
       




