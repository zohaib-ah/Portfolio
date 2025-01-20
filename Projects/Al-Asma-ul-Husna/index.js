var currentaudio;


const first_button = document.createElement("button")
first_button.className = 'btn';
first_button.classList.add('button');
first_button.id = "0";

document.body.appendChild(first_button);

const firstImg = document.createElement('img');
firstImg.id = "title";
firstImg.src = "images/0.png";

first_button.appendChild(firstImg);

first_button.addEventListener("click", function () {

    if (currentaudio) {
      currentaudio.pause();
    }
  
    var audio1 = new Audio("sounds/0.mp3");
  
    currentaudio = audio1;
    audio1.play();
  
  });
const div1 = document.createElement("div");
div1.className = "set";
document.body.appendChild(div1);




for(var i = 1; i < 100; i++){

    const button = document.createElement('button');

    button.classList.add('button1');
    button.classList.add('btn');
    button.id = ""+i;


    const buttonImg = document.createElement('img');
    buttonImg.className = 'img';
    buttonImg.src = 'images/'+ i + '.png';
    button.appendChild(buttonImg);


    button.addEventListener("click", function(){

        
        if (currentaudio) {
            currentaudio.pause();
        }
 
        var statement = this.id;
       
       
        
        var audio1 = new Audio("sounds/"+statement+".mp3");
        
        currentaudio = audio1;
        audio1.play();

    });
    div1.appendChild(button);
}


