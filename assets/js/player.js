// Constructeur de l'objet joueur  
function Player (imgName, x, y, name, health, weapon ){

    this.imgName = "player" + imgName; // player + id -> player1 ou player2
	this.x = x;            // Numéro de ligne
    this.y = y;            // Numéro de colonne
    this.name = name;      // Nom du joueur
	this.health = health;  // Santé du joueur
	this.weapon = weapon   // Objet contenant les armes
}