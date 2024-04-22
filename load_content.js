const aside = document.getElementById('aside-ul');
const main = document.getElementsByTagName('main')[0];
const buttons = document.getElementsByClassName('report-btn');

let currentReport;
let currentActiveSection;
function readReport(num) {
    fetch('./reports.json')
        .then((response) => response.json())
        .then((json) => {
            currentReport = json[num];
            currentActiveSection = 0;
            let list = '';

            currentReport.content.forEach(el => list += (`<li class="aside-btn">${el.title}</li>`));
            aside.innerHTML = list;

            initSectionButtons();
            openSection(currentActiveSection);

            for (let i = 0; i < buttons.length; i++) {
                if (i !== num) {
                    buttons[i].classList.remove('report-btn-active');
                } else {
                    buttons[i].classList.add('report-btn-active');
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
}



function initReportButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => readReport(i));
    }
}

function openSection(num) {
    currentActiveSection = num;
    let mainArr = currentReport.content[currentActiveSection].main;
    main.innerHTML = "";

    for(let mainValue of mainArr) {
        main.innerHTML += mainValue
    }

    let aside_buttons = document.getElementsByClassName("aside-btn");
    for (let i = 0; i < aside_buttons.length; i++) {
        if (i !== num) {
            aside_buttons[i].classList.remove('aside-btn-active');
        } else {
            aside_buttons[i].classList.add('aside-btn-active');
        }
    }
}

function initSectionButtons() {
    let aside_buttons = document.getElementsByClassName("aside-btn");
    for (let i = 0; i < aside_buttons.length; i++) {
        aside_buttons[i].addEventListener('click', () => openSection(i))
    }
}


window.onload = () => {
    readReport(0);
    initReportButtons();
};
