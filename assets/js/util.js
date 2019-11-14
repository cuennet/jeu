/*##############---------  VARIABLES GLOBALES  ---------#############*/
var carte = document.getElementById("carte");
carte.innerHTML = ""; // On vide le contenu entre les balises d'id map
var divMap = carte.appendChild(document.createElement("div")); // Insère une balise <div> dans la div "map"
divMap.classList.add("divTable");
// Pour la fonction createTab()
var nbRow = 10, // Nombre de lignes du plateau
    nbCol = 10; // Nombre de colonnes du plateau
var cellule = [];

// Pour la fonction scanCell()
var verifCell = false;
var x, y; // Variables pour la fonction scanCell(), placePLayer(), placeWeapon()

// Pour les fonctions placePlayer1() et placePlayer2() puis les déplacements des players
var player1 = {},
    player2 = {},
    currentPlayer = {},
    opponentPlayer = {},
    oldWeapon = {};

var cpt = 0; // Compteur de touches pressées

/*##############-------------  FONCTIONS  -------------#############*/
// Scanne les cellules et retourne une cellule disponible
function scanCell() { // Vérifie si une cellule est disponible
    do {
        var cpt = 0;
        x = getRandomIntInclusive(0, 9);
        y = getRandomIntInclusive(0, 9);
        if (cellule[x][y].isAccess === true) {
            if (cellule[x][y].isPlayer === null) {
                if (cellule[x][y].isWeapon === null) {
                    if (x + 1 < 9 && cellule[x + 1][y].isPlayer === null) {
                        if (x - 1 > 0 && cellule[x - 1][y].isPlayer === null) {
                            if (y + 1 < 9 && cellule[x][y + 1].isPlayer === null) {
                                if (y - 1 >= 0 && cellule[x][y - 1].isPlayer === null) {
                                    verifCell = true;
                                    if (verifCell === true) {
                                        cpt += 1;
                                        return cellule[x][y];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    while (cpt < 5); // scanne 5 fois les cellules libres
}

// Renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}