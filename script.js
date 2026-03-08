const audioBtn = document.querySelector('.audio-btn');
const audio = document.getElementById('voice-audio');

audioBtn.addEventListener('click', () => {
    audio.play();
});

const cups = Array.from(document.querySelectorAll(".cup"));
const result = document.getElementById("cups-result");

let correctCup = 0;
let canClick = false;

function startShuffle(){

  result.textContent="";

  cups.forEach(c=>{
    c.classList.remove("open");
    c.querySelector(".under").textContent="";
  });

  correctCup = Math.floor(Math.random()*3);

  canClick=false;

  // показываем сердце
  cups[correctCup].querySelector(".under").textContent="❤️";
  cups[correctCup].classList.add("open");

  // через 1.5 секунды закрываем
  setTimeout(()=>{

    cups[correctCup].classList.remove("open");
    cups[correctCup].querySelector(".under").textContent="";

    startRealShuffle();

  },1500);

}


function startRealShuffle(){

  let times = 0;

  const shuffle = setInterval(()=>{

    const a = Math.floor(Math.random()*3);
    const b = Math.floor(Math.random()*3);

    cups[a].style.transform = `translateX(${(b-a)*100}px)`;
    cups[b].style.transform = `translateX(${(a-b)*100}px)`;

    setTimeout(()=>{
      cups[a].style.transform="";
      cups[b].style.transform="";
    },400);

    times++;

    if(times>6){
      clearInterval(shuffle);
      canClick=true;
    }

  },500);

}


cups.forEach((cup,index)=>{

  cup.addEventListener("click",()=>{

    if(!canClick) return;

    cup.classList.add("open");

    if(index === correctCup){

      cup.querySelector(".under").textContent="❤️";
      result.textContent="Правильно! Иди к шкафу";

    }else{

      cup.querySelector(".under").textContent="❌";
      result.textContent="Попробуй ещё";

    }

    canClick=false;

  });

});