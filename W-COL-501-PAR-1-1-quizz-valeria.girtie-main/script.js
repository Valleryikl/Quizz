document.addEventListener('DOMContentLoaded', function () {
    let MAIN = document.getElementsByTagName('main')[0];
    let start = document.querySelector('.start');
    let correct = 0;
    let incorrectly = 0;
    let i = -1;
    async function afficherFilms() {
        const jsn = await fetch("document.json");
        const quiz = await jsn.json();
        let p = document.createElement('p');
        let div = document.createElement('div');
        let text = document.createElement('p');
        div.className = "choose-group";
        p.className = "question";
        text.className = "text";
        MAIN.appendChild(p);
        MAIN.appendChild(div);
        MAIN.appendChild(text);
        div.innerHTML = "";
        start.addEventListener('click', function() {
            start.textContent = "Another question";
            if(i < 8) {
                i++;
                text.style.display = "none"
                div.style.display ="block";
                p.style.display ="block";
                p.textContent = `${quiz[i].question}`;
                div.innerHTML = `<button class="choose">${quiz[i].reponses[0]}</button> <br> <button class="choose">${quiz[i].reponses[1]}</button> <br> <button class="choose">${quiz[i].reponses[2]}</button> <br> <button class="choose">${quiz[i].reponses[3]}</button>`;
                for (let x = 0; x < 4; x++) {
                    document.querySelectorAll('.choose')[x].addEventListener('click', function() {
                        if(quiz[i].reponses[x] == quiz[i].reponses[quiz[i].solution - 1]) {
                            document.querySelectorAll('.choose')[x].style.backgroundColor = "green";
                            correct++;
                            document.querySelectorAll('.choose')[x].disabled = true;
                        } else {
                            document.querySelectorAll('.choose')[x].style.backgroundColor = "red";
                            incorrectly++;
                            document.querySelectorAll('.choose')[x].disabled = true;
                        }
                    })
                }
            } else {
                div.style.display ="none";
                p.style.display ="none";
                text.style.display="block";
                start.textContent = "Start Over";
                if(correct == 0 && incorrectly == 0) {
                    text.innerHTML = `WTF? <br> correct:${correct}, incorrectly:${incorrectly}`;
                }else if(correct >= 8 && incorrectly == 0) {
                    text.innerHTML = `Don't lie bitch) <br> correct:${correct}, incorrectly:${incorrectly}`;
                } else if (correct >= 5 && incorrectly < 5) {
                    text.innerHTML = `Well done, you're cool! <br> correct:${correct}, incorrectly:${incorrectly}`;
                } else if(correct < 5) {
                    text.innerHTML = `Well listen, it's not all that bad. <br> correct:${correct}, incorrectly:${incorrectly}`;
                } else if (incorrectly > 15) {
                    text.innerHTML = `LOOOOOL <br> correct:${correct}, incorrectly:${incorrectly}`;
                } else {
                    text.innerHTML = `Cool <br> correct:${correct}, incorrectly:${incorrectly}`;
                }
                i = -1;
            }
        })
    }
    afficherFilms();
})