
const textInput = document.getElementById('textInput');
const textBut = document.getElementById('textBut');
const statisticsDiv = document.getElementById("statistics");

textBut.addEventListener('click', () => {
    const text = textInput.value;
    const words = text.split(" ");
    const textArr = [];
    for (let i = 0; i < words.length; i++) {
        const el = words[i];

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
    const uniqueWords = new Set;
    const wordCountMap = new Map;
    array.forEach(function (element) {
        uniqueWords.add(element.toLowerCase());
    })
    const counts = uniqueWords.size;
    array.forEach(function (word) {
        const wordlow = word.toLowerCase();
        if (wordCountMap.has(wordlow)) {
            wordCountMap.set(wordlow, wordCountMap.get(wordlow) + 1)
        }
        else {
            wordCountMap.set(wordlow, 1)
        }
    })
    statisticsDiv.classList.add('active');

    statisticsDiv.innerHTML = `<p>Кількість унікальних слів: ${counts}</p>
    <p>Кількість входжень слів:</p>`;
    wordCountMap.forEach(function (count, word) {
        statisticsDiv.innerHTML += "<p>" + word + ": " + count + " раз(и)</p>";
    });
}

