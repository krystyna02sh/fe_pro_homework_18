
const textInput = document.getElementById('textInput');
const textBut = document.getElementById('textBut');
const statisticsDiv = document.getElementById("statistics");
textBut.addEventListener('click', () => {
    const text = textInput.value;
    if (text.trim() !== "") {
        debugger
        fetch('/server/index.mjs', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: text,
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Oops')
                }
                return resp.json();
            })
            .then(responceData => {
                const arrayFromSpread = responceData.arrayFromSpread;


                statisticsDiv.innerHTML = `<p>Кількість унікальних слів: ${responceData.counts}</p>`;
                if (arrayFromSpread !== undefined) {
                    arrayFromSpread.forEach(function (pair) {
                        const word = pair[0];
                        const count = pair[1];
                        statisticsDiv.innerHTML += "<p>" + word + ": " + count + " раз(и)</p>";
                        statisticsDiv.classList.add('active');
                    });
                } else {

                    console.error("arrayFromSpread is undefined");
                }

            })
            .catch(error => {
                console.error(error)
            });
    } else {
        statisticsDiv.innerHTML = "<p>Кількість унікальних слів: 0 .</p>";
        statisticsDiv.classList.add('active');

    }

    textInput.value = "";
})





