
let suits=[`Spade`,`Heart`,`Diamond`,`Club`];
let values=[`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`J`,`Q`,`K`,`A`];
let deck;

// this function creats complete deck of cards:
function creatDeck(){
    for(var i=0;i<suits.length;i++){
     
        for(var x=0; x<values.length;x++){
            var weights;
            if (values[x]==`J`||values[x]==`Q`||values[x]==`K`){
                weights=10;
            }else if (values[x]==`A`){
                weights=11;
            }else{
                weights=(values[x])*1  //than str '5'*1 it will int 5; 
            }
            var card=[suits[i],values[x],weights,'./'+suits[i]+'/'+x+'.png']
            deck.push(card)
        }
    }
}

 
// this function takes rendom number between 0 and max(max's in range) values:
function rendNumber(max){
    return Math.floor(Math.random()*(max+1))
}


//this function's has two parameters, both parameters are array,
//  this function cuts rendom element from first array and adds this element 
// in  second array:
function takeCard(array1,array2){
    let max=array1.length-1;
    let rendIndex=rendNumber(max);
    array2.push(array1[rendIndex]);
    array1.splice(rendIndex,1)
}

// this function taks parameter array's all members 
//and from each of them teks index 2 element's int value 
//and sums all of them;
function calculateCards(array){
    let score=0;
    for(let i=0; i<array.length; i++){
        score+=array[i][2]
    }
    return score;
}

// this function taks two arrays (compiuterCard and playerCard) 
// calculates each of them Cards scors (using fanction calculateCards()) 
// then comparsions the scores together and returns winners name :
function comparsion(array1,array2){
   let score1=calculateCards(array1)
   let score2=calculateCards(array2)
   if (score1>score2){
      if(score1<=21){
          return '1'
        }else if(score1>21&&score2>21){
            return 'Equal'
        }else{
            return '2'
        }
   }else if(score2>score1){
       if(score2<=21){
           return '2'
       }else if(score2>21 && score1>21){
           return 'Equal'
       }else{
           return '1'
       }      
   }else{
       return 'Equal'
   }
}

// ამ ფუნქციას გადაეცემა 2 არგუმენტი.
// პირველი არგუმენტი არის  მასივი(რომლის თითოეული ელემენტი ასევე მასივია),
// ხოლო მეორე არგუმენტი კი უბრალოდ ნატურალური რიცხვია,
// პირველ არგუმენტში(მასივში)  ფუნქცია დაითვლის ელემენტების რაოდენობას სულ და ასევე დაითვლის იმ ელემენტების რაოდენობას
// რომელის მნიშვნელობაც  მეორე არგუმენტზე ნაკლები ან ტოლია;
//ფუნქცია შემდეგ განსაზრვრავს მასივიდან მეორე არგუმენტის ტოლი ან მასზე ნაკლები ელემენტის ამოსვლის ალბათობას(მეათედების სიზუსტით); 

function clculateProbability(array,maxvalue){
    let sumElement=array.length;
    let sumWantedElement=0;
    for(let i=0; i<sumElement; i++){
        if(array[i][2]<=maxvalue){
            sumWantedElement++
        }
    }  
    console.log('მაქსიმუმი სასურველი კარტის მნიშვნელობა: '+maxvalue)
    console.log('სულ ხდომილობა'+sumElement);
     console.log('სასურველი ხდომილობა: '+sumWantedElement);  
     console.log('სასურველი კარტის მოსვლის ალბათობა: '+(sumWantedElement/sumElement).toFixed(2)*100+'%')
         return (((sumWantedElement/sumElement).toFixed(2))*1)
}

let controler=1; // than this variable ==1 function satartGame() works in other case dosn't work:

let computerCard=[];
let playerCard=[];

function satartGame(){
    document.getElementById('your-score').innerHTML='';
    document.getElementById('comp-score').innerHTML='';
    document.getElementById('status').innerHTML='';
    if(controler==1){
    let compDiv=document.getElementById('computer');
    while (compDiv.hasChildNodes()) {
        compDiv.removeChild(compDiv.firstChild);
      }
      let playerDiv=document.getElementById('player');
    while (playerDiv.hasChildNodes()) {
        playerDiv.removeChild(playerDiv.firstChild);
      }
    counterPlayer=2;
    counterComp=2;
    deck=[];
    computerCard=[];
    playerCard=[];
    creatDeck();
    takeCard(deck,computerCard);
    takeCard(deck,playerCard);
    takeCard(deck,computerCard);
    takeCard(deck,playerCard);     
     
    let compCardImage1=document.createElement('img');
    compCardImage1.setAttribute('id','compCardFirst');
    compCardImage1.setAttribute('src','./cards/background .png')
    document.getElementById('computer').appendChild(compCardImage1)

    let compCardImage2=document.createElement('img');
    compCardImage2.setAttribute('src',computerCard[1][3])
    document.getElementById('computer').appendChild(compCardImage2)  

    let playerCardImage1=document.createElement('img');
    playerCardImage1.setAttribute('src',playerCard[0][3])
    document.getElementById('player').appendChild(playerCardImage1)

    let playerCardImage2=document.createElement('img');
    playerCardImage2.setAttribute('src',playerCard[1][3])
    document.getElementById('player').appendChild(playerCardImage2)
    }
    document.getElementById('your-score').innerHTML='YOUR SCORE: '+calculateCards(playerCard)
    controler=0;
}
let counterPlayer=2 // this variable counts how much clicks player on button "Add Card"" 
let counterComp=2 // this variable counts how much adds computer card;
 
function addCard(){
    if(controler==0){
        takeCard(deck,playerCard);
        let playerCardImage=document.createElement('img');
        playerCardImage.setAttribute('src',playerCard[counterPlayer][3]);
        document.getElementById('player').appendChild(playerCardImage);
        document.getElementById('your-score').innerHTML='YOUR SCORE: '+calculateCards(playerCard)
        
        counterPlayer++;
        
        let maxvalue=21-calculateCards(computerCard);
        let Probability=clculateProbability(deck,maxvalue);
        if(calculateCards(computerCard)<21&&Probability >= 0.3){
            takeCard(deck,computerCard)
            let compCardImage=document.createElement('img');
            compCardImage.setAttribute('src',computerCard[counterComp][3])       
            document.getElementById('computer').appendChild(compCardImage);
            counterComp++
        }
    } 
}
        


let compResult=0;
let playerResult=0;
function openCard(){
    document.getElementById('compCardFirst').src=computerCard[0][3];
    let status=comparsion(computerCard,playerCard)
    if (status==='1'){
        document.getElementById('status').innerHTML='YOU LOSE'
         compResult++
        document.getElementById('comp-result').innerHTML=compResult;
    }else if(status=='2'){
        document.getElementById('status').innerHTML='YOU WIN'
        playerResult++
        document.getElementById('player-result').innerHTML=playerResult;
    }else{
        document.getElementById('status').innerHTML='EQUAL'
    }
    document.getElementById('your-score').innerHTML='YOUR SCORE: '+calculateCards(playerCard)
    document.getElementById('comp-score').innerHTML='COMP SCORE: '+calculateCards(computerCard)
    controler=1;      
}

    
    
   




































