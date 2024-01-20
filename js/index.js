
const textInput = document.getElementById('textInput');
const textBut = document.getElementById('textBut');
const answer = document.getElementById('answer');
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
        wordCount(textArr);
    }
    else {
        answer.textContent = "Кількість слів: 0";
    }
    const wordCountMap = new Map;
    textArr.forEach(function (word) {
        if (wordCountMap.has(word)) {
            wordCountMap.set(word, wordCountMap.get(word) + 1)
        }
        else {
            wordCountMap.set(word, 1)
        }
    })
    const statisticsDiv = document.getElementById("statistics");
    statisticsDiv.classList.add('active');
    statisticsDiv.innerHTML = "<p>Кількість входжень слів:</p>";
    wordCountMap.forEach(function (count, word) {
        statisticsDiv.innerHTML += "<p>" + word + ": " + count + " раз(и)</p>";
    });
    textInput.value = "";
})
function wordCount(arr) {
    const uniqueWords = new Set(arr);
    const counts = uniqueWords.size;
    answer.textContent = "Кількість унікальних слів:" + counts;
}


