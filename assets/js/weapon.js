// Constructeur de l'objet arme 
function Weapon (id, name, force){
    this.id = id;       // id de l'arme
    this.name = name;   // nom de l'arme
	this.force = force; // Force de l'arme
}
// Instances d'arme
var fourchette = new Weapon(0, "fourchette", 10),
    couteau = new Weapon(1, "couteau", 20),
    pistolet = new Weapon(2, "pistolet", 30),
    bazooka = new Weapon(3, "bazooka", 40);