
const textInput = document.getElementById('textInput');
const textBut = document.getElementById('textBut');
const statisticsDiv = document.getElementById("statistics");
textBut.addEventListener('click', () => {
    const text = textInput.value;
    const words = text.split(" ");
    const textArr = [];
    for (let i = 0; i < words.length; i++) {
        let el = words[i];

        if (el.trim() !== "") {
            textArr.push(el)
        }
    }
    if (text.trim() !== "") {
        getCount(textArr);
    }
    else {
        statisticsDiv.innerHTML = "<p>Кількість унікальних слів: 0 .</p>";
        statisticsDiv.classList.add('active');
    }

    textInput.value = "";
})

function getCount(array) {
    const uniqueWords = new Set(array);
    const counts = uniqueWords.size;
    const wordCountMap = new Map;
    array.forEach(function (word) {
        if (wordCountMap.has(word)) {
            wordCountMap.set(word, wordCountMap.get(word) + 1)
        }
        else {
            wordCountMap.set(word, 1)
        }
    })
    statisticsDiv.classList.add('active');

    statisticsDiv.innerHTML = `<p>Кількість унікальних слів: ${counts}</p>
    <p>Кількість входжень слів:</p>`;
    wordCountMap.forEach(function (count, word) {
        statisticsDiv.innerHTML += "<p>" + word + ": " + count + " раз(и)</p>";
    });
}

