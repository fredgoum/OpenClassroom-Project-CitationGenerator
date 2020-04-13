const shortSentences = [
    ["Avec ", "Considérant ", "Où que nous mène ", "Vu "],
    ["la restriction ", "l'orientation ", "la crise ", "l'inertie "],
    ["il convient d'", "il faut ", "on se doit d'", "induite "],
    ["étudier ", "examiner ", "anticiper ", "imaginer "],
    ["toutes les ", "chacune des ", "la majorité des ", "l'ensemble des "],
    ["solutions ", "issues ", "problématiques ", "alternatives "],
    ["imaginables ", "possibles ", "s'offrant à nous ", "rapidement "],
    ["à long terme.", "pour longtemps.", "à l'avenir."]
];
const longSentences = [
    ["Si vous voulez mon avis concernant ", "Dans le but de pallier à ", "Afin de circonvenir à ", "Pour réagir face à "],
    ["cette inflexion ", "l'inconstance ", "la complexité ", "la fragilité "],
    ["que nous constatons ", "intrinsèque ", "de l'époque actuelle ", "de ces derniers temps "],
    ["je vous demande d'", "je n'exclus pas d'", "je suggère fortement d'", "nous sommes contraints d'"],
    ["inventorier ", "essayer ", "expérimenter ", "arrêter de stigmatiser "],
    ["précisement les ", "systématiquement les ", "les principales ", "la plus grande partie des "],
    ["stratégies ", "hypothèses ", "modalités ", "décisions "],
    ["parce que nous le valons bien.", "parce qu'il est temps d'agir.", "même si se n'est pas facile."]
];

// Title options
const titleOptions = document.getElementById('options');
titleOptions.addEventListener('click', function() {
    const title = document.getElementById('titleOptions');
    if (titleOptions.checked) {
      title.innerHTML = 'Masquer les options';
    } else {
      title.innerHTML = 'Afficher les options';
    }
});

// Generate quotes
const quotesGeneratorBtn = document.getElementById('quotesGeneratorBtn');
quotesGeneratorBtn.addEventListener('click', function() {
    // get select options (number of quotes and type of generator)
    const quotesNb = document.getElementById('quotesNb');
    const quotesNbSelected= quotesNb.options[quotesNb.selectedIndex].value;
    const quotesGenerator = document.getElementById('quotesGenerator');
    const quotesGeneratorSelected= quotesGenerator.options[quotesGenerator.selectedIndex].value;
    
    let sentences = [];
    if (quotesGeneratorSelected == 'shortSentencesGenerator') {
      sentences = shortSentences;
    } else {
      sentences = longSentences;
    }

    // Get quotes to display
    const quotes = [];
    for (let i = 0; i < quotesNbSelected; i++) {
      let quote = [];
      for (let i = 0; i < sentences.length; i++) {
        let randomNumber = Math.floor(Math.random() * sentences[i].length);
        let randomWord = sentences[i][randomNumber];
        quote.push(randomWord)
      }
      quotes.push(quote.join(''));
      console.log(quote.join(''));
    }

    // Display quotes
    let quotesSentence ="";
    quotes.forEach(quote => {
      quotesSentence += quote + "<br/><br/>";
    });
    document.getElementById('display-quotes').innerHTML = quotesSentence;
    
    // Pronounce quotes
    let speech = new SpeechSynthesisUtterance(quotesSentence);
    speechSynthesis.cancel();
    speech.lang = 'fr-FR';
    speech.pitch = 1;
    speech.rate = 1;
    speech.voiceURI = 'native';
    speech.volume = 1;
    if (document.getElementById("speeckCheckbox").checked) {
      speechSynthesis.speak(speech);
    }
});

// Stop game so stop speech also
const stopGameBtnElt = document.getElementById('stopGame');
stopGameBtnElt.addEventListener('click', function() {
    speechSynthesis.cancel();
});

// Stop speech if we uncheck the speech checkbox option
const speeckCheckboxElt = document.getElementById('speeckCheckbox');
speeckCheckboxElt.addEventListener('click', function() {
    if (! document.getElementById("speeckCheckbox").checked) {
      speechSynthesis.cancel();
    }
});
