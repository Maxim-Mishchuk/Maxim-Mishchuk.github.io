const aside = document.getElementById('aside-ul');
const main = document.getElementsByTagName('main')[0];
const buttons = document.getElementsByClassName('report-btn');
function readReport(num) {
    fetch('./reports.json')
        .then((response) => response.json())
        .then((json) => {
            let currentReport = json[num];
            let list = '';

            currentReport.aside.forEach(el => list += (`<li>${el}</li>`));
            aside.innerHTML = list;

            main.innerHTML = currentReport.main;

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


window.onload = () => {
    readReport(0);
    initReportButtons();
};
