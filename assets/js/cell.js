// Constructeur de l'objet cellule      
function Cell (id, classe, x, y, isPlayer, isWeapon, weapon, isAccess){

	this.id = id;                                           // Attribut id
    this.classe = classe;                                   // Attribut class
	this.x = x;								                // Position ligne
	this.y = y;								                // Position colonne
	this.isPlayer = isPlayer;								// Libre ou occupé par un personnage
	this.isWeapon = isWeapon;								// Libre ou occupé par une arme
    this.weapon = weapon;                                   // Nom de l'arme dans la cellule
	this.isAccess = Math.random() < 0.9 ? true : false ;	// Environ 10 obstacles
}