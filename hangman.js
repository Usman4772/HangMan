const wordArray = [
    { word: "elephant", hint: "A large mammal with tusks and a trunk" },
    { word: "sunflower", hint: "A tall plant with a large, yellow flower head" },
    { word: "jazz", hint: "A genre of music with improvisation and syncopation" },
    { word: "galaxy", hint: "A massive system of stars, gas, and dust in space" },
    { word: "cappuccino", hint: "An Italian coffee drink with espresso and frothed milk" },
    { word: "rainbow", hint: "A meteorological phenomenon with a spectrum of light" },
    { word: "treasure", hint: "Valuables hidden or stored with great care" },
    { word: "kangaroo", hint: "A marsupial with a strong tail and powerful hind legs" },
    { word: "keyboard", hint: "An input device for computers with keys for typing" },
    { word: "island", hint: "A piece of land surrounded by water" }
  ];
//creating Buttons
function createButtons(){
    let keyboard=document.querySelector(".keyboard")
    for(let i=97 ;i<=122;i++){
        let button=document.createElement("button")
         button.innerText=String.fromCharCode(i).toUpperCase();
         keyboard.appendChild(button)
    }
}
createButtons()



let playAgain=document.querySelectorAll(".playAgain")
playAgain.forEach(btn=>{
    btn.addEventListener("click",restartGame)
})
  function restartGame(){
    document.querySelector(".endGame").style.display="none"
    document.querySelector(".end-container").style.display="none"
    document.querySelector(".success-container").style.display="none"
    incorrectWrods=0;
    imageCounter=0;
   guessedWords=0;
   document.querySelector(".incorrect-guesses span").innerHTML="0/6"
   document.querySelector(".image-box img").src="hangman-0.png"
    getRandomWord()
    
}

let currentWord;
let incorrectWrods=0;
let totalGuesses=6;
let imageCounter=0;
let guessedWords=0;
function getRandomWord(){
    let hintElm=document.querySelector(".hint-container span")
    let index =Math.floor(Math.random()* wordArray.length)
    let {word,hint}=wordArray[index];
    hintElm.innerText=hint
    currentWord=word

    document.querySelector(".letter-box").innerHTML=word.split("").map(()=>`   <li class="letters"></li>`).join("")
}
getRandomWord()

let buttons=document.querySelectorAll(".keyboard button")

buttons.forEach(btn=>{
 btn.addEventListener("click",addWord)
})
function addWord(e){
 document.querySelector("audio").play()
    currentWord=currentWord.toUpperCase()
let pressedBtn=e.target.innerText.toUpperCase()

if(currentWord.includes(pressedBtn)){
guessedWords++
let letters=document.querySelectorAll(".letters")
for(let i=0;i<currentWord.length;i++){
   if(currentWord[i]===pressedBtn){
   letters[i].innerText=pressedBtn
   letters[i].classList.add("guessed")
   }
 
   
}
if(currentWord.length===guessedWords){
    setTimeout(()=>{
 endGame(true)
    },300)
}

}else{
    incorrectWrods++;
    imageCounter++
    if(imageCounter>6){
        imageCounter=6
    }
    if(incorrectWrods>=6){
        document.querySelector(".incorrect-guesses span").innerHTML=  `${incorrectWrods}/${totalGuesses}`
    document.querySelector(".image-box img").src=`hangman-${imageCounter}.png`
    setTimeout(()=>{
        endGame(false)
    },300)

}
       
    

    document.querySelector(".incorrect-guesses span").innerHTML=  `${incorrectWrods}/${totalGuesses}`
    document.querySelector(".image-box img").src=`hangman-${imageCounter}.png`
}
}
function endGame(success){
    if(!success){
        document.querySelector(".endGame").style.display="flex"
        document.querySelector(".end-container").style.display="flex"
        document.querySelector(".correctWord span").innerText=currentWord
        return
    }else{
        document.querySelector(".endGame").style.display="flex"
        document.querySelector(".success-container").style.display="flex"
        return
    }

}

