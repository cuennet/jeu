var move = {
    turn: function(posX, posY, joueurActuel) {
        cpt++;
        var resteCpt = 3-cpt;
        setTimeout(function(){ // Efface "Obstacle infranchissable" au bout de 0.5 s
            $('#obstacle-' + joueurActuel.imgName).html('');
        },500);
        if (cpt < 3) {
            $('#quijoue-' + joueurActuel.imgName).html('À vous de jouer !<br>Il reste ' + resteCpt + ' coup·s à jouer.');
            move.appui(joueurActuel.x, joueurActuel.y, joueurActuel);
        } else if (cpt >= 3) {
            $('#quijoue-' + joueurActuel.imgName).html('À vous de jouer !<br>Il reste 0 coup·s à jouer.');
            cpt = 0;
            $("#div-" + joueurActuel.imgName).delay(300).animate({opacity: 0.2}, "slow");
            if (joueurActuel === player1) {
                joueurActuel = player2;
                $('#quijoue-' + joueurActuel.imgName).html('À vous de jouer !<br>Il reste 3 coup·s à jouer.');
                $('#obstacle-' + joueurActuel.imgName).html('');
                move.appui(joueurActuel.x, joueurActuel.y, joueurActuel);
            } else if (joueurActuel === player2) {
                joueurActuel = player1;
                $('#quijoue-' + joueurActuel.imgName).html('À vous de jouer !<br>Il reste 3 coup·s à jouer.');
                $('#obstacle-' + joueurActuel.imgName).html('');
                move.appui(joueurActuel.x, joueurActuel.y, joueurActuel);
            }
            $("#div-" + joueurActuel.imgName).delay(300).animate({opacity: 1}, "slow");
        }
    },
    
    appui: function(posX, posY, joueurActuel) {
        cellule[posX][posY].isPlayer = false; // Actualise l'objet cellule
        $(document).on("keydown", function (e) {
            if (e.which === 37) { // Vers la gauche
                posX = posX;
                posY = posY - 1;
                if (posY >= 0) {
                    if (cellule[posX][posY].isAccess === true) {
                        $(document).off("keydown");
                        cellule[posX][posY + 1].isAccess = true;
                        cellule[posX][posY].isAccess = false;
                        cellule[posX][posY].isPlayer = true;
                        move.deplacePlayer(posX, posY, joueurActuel);
                    } else if (cellule[posX][posY].isAccess === false) {
                        $(document).off("keydown");
                        $('#obstacle-' + joueurActuel.imgName).text('Obstacle infranchissable.');
                        cpt -= 1;
                        move.turn(posX, posY, joueurActuel);
                    }
                } else if (posY < 0) {
                    $(document).off("keydown");
                    $('#obstacle-' + joueurActuel.imgName).text('Déplacement impossible.');
                    cpt -= 1;
                    move.turn(posX, posY, joueurActuel);
                }
            } else if (e.which === 38) { // Vers le haut
                posX = posX - 1;
                posY = posY;
                if (posX >= 0) {
                    if (cellule[posX][posY].isAccess === true) {
                        $(document).off("keydown");
                        cellule[posX + 1][posY].isAccess = true;
                        cellule[posX][posY].isAccess = false;
                        cellule[posX][posY].isPlayer = true;
                        move.deplacePlayer(posX, posY, joueurActuel);
                    } else if (cellule[posX][posY].isAccess === false) {
                        $(document).off("keydown");
                        $('#obstacle-' + joueurActuel.imgName).text('Obstacle infranchissable.');
                        cpt -= 1;
                        move.turn(posX, posY, joueurActuel);
                    }
                } else if (posX < 0) {
                    $(document).off("keydown");
                    $('#obstacle-' + joueurActuel.imgName).text('Déplacement impossible.');
                    cpt -= 1;
                    move.turn(posX, posY, joueurActuel);
                }

            } else if (e.which === 39) { // Vers la droite
                posX = posX;
                posY = posY + 1;
                if (posY <= 9) {
                    if (cellule[posX][posY].isAccess === true) {
                        $(document).off("keydown");
                        cellule[posX][posY - 1].isAccess = true;
                        cellule[posX][posY].isAccess = false;
                        cellule[posX][posY].isPlayer = true;
                        move.deplacePlayer(posX, posY, joueurActuel);
                    } else if (cellule[posX][posY].isAccess === false) {
                        $(document).off("keydown");
                        $('#obstacle-' + joueurActuel.imgName).text('Obstacle infranchissable.');
                        cpt -= 1;
                        move.turn(posX, posY, joueurActuel);
                    }
                } else if (posY > 9) {
                    $(document).off("keydown");
                    $('#obstacle-' + joueurActuel.imgName).text('Déplacement impossible.');
                    cpt -= 1;
                    move.turn(posX, posY, joueurActuel);
                }
            } else if (e.which === 40) { // Vers le bas
                posX = posX + 1;
                posY = posY;
                if (posX <= 9) {
                    if (cellule[posX][posY].isAccess === true) {
                        $(document).off("keydown");
                        cellule[posX - 1][posY].isAccess = true;
                        cellule[posX][posY].isAccess = false;
                        cellule[posX][posY].isPlayer = true;
                        move.deplacePlayer(posX, posY, joueurActuel);
                    } else if (cellule[posX][posY].isAccess === false) {
                        $(document).off("keydown");
                        $('#obstacle-' + joueurActuel.imgName).text('Obstacle infranchissable.');
                        cpt -= 1;
                        move.turn(posX, posY, joueurActuel);
                    }
                } else if (posX > 9) {
                    $(document).off("keydown");
                    $('#obstacle-' + joueurActuel.imgName).text('Déplacement impossible.');
                    cpt -= 1;
                    move.turn(posX, posY, joueurActuel);
                }
            }
        });
    },

    deplacePlayer: function(posX, posY, joueurActuel) {
        $("[alt=" + joueurActuel.imgName + "-" + joueurActuel.weapon.name + "]").remove(); // Supprime la balise qui contient l'attribut alt="player1-arme" 
        if (cellule[posX][posY].isWeapon === true) {
            $("[alt=" + cellule[posX][posY].weapon.name + "]").remove(); // Supprime l'arme
            oldWeapon = joueurActuel.weapon; // Met l'arme du joueur en tampon
            joueurActuel.weapon = cellule[posX][posY].weapon; // L'arme du joueur est l'arme de la cellule
            cellule[posX][posY].weapon = oldWeapon; // L'objet cellule reprend l'ancienne arme du joueur
            $('#' + cellule[posX][posY].id).append("<img src='assets/img/" + cellule[posX][posY].weapon.name +".png' alt='" + cellule[posX][posY].weapon.name +"'/>");
            $('#' + cellule[posX][posY].id).append("<img src='assets/img/" + joueurActuel.imgName + "-" + joueurActuel.weapon.name + ".png' alt='" + joueurActuel.imgName + "-" + joueurActuel.weapon.name + "'/>"); // Ajoute l'image
            $('#arme-' + joueurActuel.imgName).text('ARME : ' + joueurActuel.weapon.name );
            $('#forcearme-' + joueurActuel.imgName).text('FORCE ARME : ' + joueurActuel.weapon.force );
        } else {
            $('#' + cellule[posX][posY].id).append("<img src='assets/img/" + joueurActuel.imgName + "-" + joueurActuel.weapon.name + ".png' alt='" + joueurActuel.imgName + "-" + joueurActuel.weapon.name + "'/>"); // Ajoute l'image        
        }
        
        joueurActuel.x = posX; // Actualise les coordonnées du joueur
        joueurActuel.y = posY;
        
       if (posX-1 > 0 && cellule[posX-1][posY].isPlayer === true) { // Conditions pour lancer le combat entre les joueurs
            $(document).off();fight.init(joueurActuel);
        } else if (posX+1 < 9 && cellule[posX+1][posY].isPlayer === true) {
            $(document).off();fight.init(joueurActuel);
        } else if (posY-1 > 0 && cellule[posX][posY-1].isPlayer === true) {
           $(document).off();fight.init(joueurActuel);
        } else if (posY+1 < 9 && cellule[posX][posY+1].isPlayer === true) {
            $(document).off();fight.init(joueurActuel);
        } else {
            move.turn(posX, posY, joueurActuel);
        }
    }
}