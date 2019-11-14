var fight = {
    init: function(joueurActuel) {
        $('#quijoue-player1').html('COMBAT !'); $('#quijoue-player2').html('COMBAT !');
        $('#instructions').html('Choisissez <u>l\'attaque</u> ou <u>la défense</u>');
        $('#barre-player1').progressbar({value : 100}); $('#barre-player2').progressbar({value : 100});
        fight.testPlayer(joueurActuel);
    },
    
    testPlayer: function(joueurActuel){
        if (joueurActuel.imgName === "player1") {
            joueurActuel = player1;
            opponentPlayer = player2;
        } else if (joueurActuel.imgName === "player2") {
            joueurActuel = player2;
            opponentPlayer = player1;
        }
        $('#div-' + joueurActuel.imgName).animate({opacity: 1}, 400);  // Eclaircit le joueur qui prend la main
        fight.choix(joueurActuel, opponentPlayer);
    },
    
   choix: function(joueurActuel, adversaire) {
       if (joueurActuel.health <= 0 || adversaire.health <= 0) {  // Le 1er à zéro a perdu
           if (joueurActuel.imgName === "player1") {
               $('#div-player1').delay(400).animate({opacity: 0}, 400);
               $('#div-player2').animate({opacity: 1});
               $('#quijoue-player2').html('<strong>YOU WIN !</strong>');
               $('#choix-player2').html("");
               $('#instructions').html(player2.name + ' a gagné ! <button class="button" id="buttonname1">Une autre partie ?</button>' );
               fight.newGame();
               return;
           } else if (joueurActuel.imgName === "player2") { 
               $('#div-player2').delay(400).animate({opacity: 0}, 400);
               $('#div-player1').animate({opacity: 1});
               $('#quijoue-player1').html('<strong>YOU WIN !</strong>');
               $('#choix-player1').html("");
               $('#instructions').html(player1.name + ' a gagné ! <button class="button" id="buttonname1">Une autre partie ?</button>' );
               fight.newGame();
               return;
            }
       }
       
       // Attaque ou défense
       $('#choix-' + adversaire.imgName).html("<strong>" + joueurActuel.name + "</strong> attaque. Que choisissez-vous ?<br><br><label class='block'><input type='radio' name='radgroup' value='A'>Attaque</label><label class='block'><input type='radio' name='radgroup' value='D'>Défense</label>");
       $('#div-' + joueurActuel.imgName).delay(400).animate({opacity: 0.2}, 400);
       $('#div-' + adversaire.imgName).delay(400).animate({opacity: 1}, 400);
        $(function () {
            $('#choix-' + adversaire.imgName).on("click", function (){ //Récupère la valeur du bouton radio
                if ($('input[type=radio][name=radgroup]:checked').attr('value') === "A") {
                    fight.attaque(joueurActuel, adversaire);
                } else if ($('input[type=radio][name=radgroup]:checked').attr('value') === "D") {
                    fight.defense(joueurActuel, adversaire);
                }
            });
        });
    },
    
    attaque: function(joueurActuel, adversaire){
        $('#choix-' + adversaire.imgName).off("click");
        adversaire.health -= joueurActuel.weapon.force;  // Supprime des points de vie à l'adversaire en fonction de l'arme de l'attaquant
        $('#barre-' + adversaire.imgName).progressbar({value : adversaire.health});     // Modifie la progressbar de l'adversaire
        $('#vie-' + adversaire.imgName).text('VIE : ' + adversaire.health + ' points'); // Affiche les points de vie de l'adversaire
        $('#div-' + joueurActuel.imgName).delay(400).animate({opacity: 0.2}, 400);      // Opacifie le joueur qui vient de jouer
        fight.turn(joueurActuel);
    },
    
    defense: function(joueurActuel, adversaire){
        $('#choix-' + adversaire.imgName).off("click");
        adversaire.health -= joueurActuel.weapon.force/2;  // Supprime des points de vie à l'adversaire en fonction de l'arme de l'attaquant
        $('#barre-' + adversaire.imgName).progressbar({value : adversaire.health});     // Modifie la progressbar de l'adversaire
        $('#vie-' + adversaire.imgName).text('VIE : ' + adversaire.health + ' points'); // Affiche les points de vie de l'adversaire
        $('#div-' + joueurActuel.imgName).delay(400).animate({opacity: 0.2}, 400);       // Opacifie le joueur qui vient de jouer
        fight.turn(joueurActuel);
    },
    
    turn: function(joueurActuel){  // Inverse les joueurs
        if (joueurActuel.imgName === "player1") {
            joueurActuel = player2;
            opponentPlayer = player1;
        } else if (joueurActuel.imgName === "player2") {
            joueurActuel = player1;
            opponentPlayer = player2;
        }
        fight.choix(joueurActuel, opponentPlayer);
    },
    
    newGame: function() {
        $(function () {
            $('#buttonname1').on("click", function () {
                document.location.reload(true);
            });
        });
    }
}