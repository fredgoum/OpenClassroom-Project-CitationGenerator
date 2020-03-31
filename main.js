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

$(document).ready(function() {
  // Options title
  $("#options").click(function() {
    if($("#options").is(':checked')) {
      $('.optionsTitle').html('Masquer les options');
    } else {
      $('.optionsTitle').html('Afficher les options');      
    }
  });
  // Generate quotes
  $("#quotesGeneratorBtn").click(function() {
      let quotesNbSelected = $('#quotesNb').val();
      let quotesGeneratorSelected = $('#quotesGenerator').val();

      let generatorTexts = [];
      if (quotesGeneratorSelected == 'shortSentencesGenerator') {
        generatorTexts = shortSentences;
      } else {
        generatorTexts = longSentences;
      }

      // Get quotes to display
      const quotes = [];
      for (let i = 0; i < quotesNbSelected; i++) {
        let quote = [];
        for (let i = 0; i < generatorTexts.length; i++) {
          let randomNumber = Math.floor(Math.random() * generatorTexts[i].length);
          let randomWord = generatorTexts[i][randomNumber];
          quote.push(randomWord)
        }
        quotes.push(quote.join(''));
        console.log(quote.join(''));
      }

      // Display quotes
      let quote ="";
      jQuery.each(quotes, function(i, value) {
          quote += value + "<br/><br/>";
      });
      $('.display-quotes').html(quote);

      // Pronounce quotes
      let speech = new SpeechSynthesisUtterance(quote);
      speechSynthesis.cancel();
      speech.lang = 'fr-FR';
      speech.pitch = 1;
      speech.rate = 1;
      speech.voiceURI = 'native';
      speech.volume = 1;
      if($("#speechCitationsCheckbox").is(':checked')) {
        speechSynthesis.speak(speech);
      }
    });

    // Stop game so stop speech also
    $("#stopGameBtn").click(function() {
      speechSynthesis.cancel();
    });
    
    // Stop speech if we uncheck the speech checkbox option
    $("#speechCitationsCheckbox").click(function() {
      if($("#speechCitationsCheckbox").is(':not(:checked)')) {
        speechSynthesis.cancel();
      }
    });
});