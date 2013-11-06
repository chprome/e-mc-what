module.exports = {
    'La surface est calculée correctement, 138x54=7452': function (test) {
        test.open('http://localhost:5000/calcul/rectangleSurface')
            .type('#width', '138')
            .type('#height', '54')
            .click('body')
            .assert.text('#result', '7 452', 'La surface a bien été calculée')
            .done();
    },
    'Saisir une valeur alphanumérique affiche un message d\'erreur': function (test) {
        test.open('http://localhost:5000/calcul/rectangleSurface')
            .type('#width', '43alpha')
            .click('body')
            .assert.text('#result', 'Veuillez saisir un nombre positif', 'Message affiché')
            .done();
    },
    'Saisir une valeur inférieur à 0 affiche un message d\'erreur': function (test) {
        test.open('http://localhost:5000/calcul/rectangleSurface')
            .type('#width', '-4')
            .click('body')
            .assert.text('#result', 'Veuillez saisir un nombre positif', 'Message affiché')
            .done();
    }
};