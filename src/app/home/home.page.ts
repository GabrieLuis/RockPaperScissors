import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  playerName: string = "";
  playerPoints: number = 0;
  computerPoints: number = 0;
  chosenOption: string = "../../assets/rock.svg";
  chooseComputer: string = "../../assets/rock.svg";
  round: number = 0;
  roundResult: string = "";

  imgRock: string = "../../assets/rock.svg";
  imgPaper: string = "../../assets/paper.svg";
  imgScissors: string = "../../assets/scissors.svg";

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {}

  async ionViewWillEnter() {
    await this.getPlayerName();
  }

  async getPlayerName() {
    const alert = await this.alertCtrl.create({
      header: 'NOME DO JOGADOR',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Informe seu nome aqui..'
        }
      ],
      buttons: [
        {
          text: 'Iniciar o jogo',
          handler: async data => {
            if (data.name !== undefined && data.name.length > 0) {
              this.playerName = data.name;
            } else {
              await this.displayMessage("Informe seu nome para começar o jogo", 'danger');
              await this.ionViewWillEnter();
            }
          }
        }
      ]
    });
    
    await alert.present();
  }
  
  async displayMessage(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 3000,
    });
    toast.present();
  }

  async play(option) {

    let optionPlayer = option;

    let optionComputer = "";
    let computerPlay = await Math.floor((Math.random() * 3) + 1);

    if (computerPlay == 1) {
      this.chooseComputer = this.imgRock;
      optionComputer = 'rock';

    } else if (computerPlay == 2) {
      this.chooseComputer = this.imgPaper;
      optionComputer = 'paper';

    } else {
      this.chooseComputer = this.imgScissors;
      optionComputer = 'scissors';

    }

    if (optionPlayer == 'rock') {
      this.chosenOption = this.imgRock;

      if (optionComputer == 'rock') {
        this.roundResult = "Empate!";
        this.round += 1;
  
      } else if (optionComputer == 'paper') {
        this.roundResult = "Você perdeu!";
        this.computerPoints += 1;
        this.round += 1;
  
      } else {
        this.roundResult = "Você venceu!";
        this.playerPoints += 1;
        this.round += 1;
  
      }

    } else if (optionPlayer == 'paper') {
      this.chosenOption = this.imgPaper;

      if (optionComputer == 'paper') {
        this.roundResult = "Empate!";
        this.round += 1;
  
      } else if (optionComputer == 'scissors') {
        this.roundResult = "Você perdeu!";
        this.computerPoints += 1;
        this.round += 1;
  
      } else {
        this.roundResult = "Você venceu!";
        this.playerPoints += 1;
        this.round += 1;
  
      }

    } else {
      this.chosenOption = this.imgScissors;

      if (optionComputer == 'scissors') {
        this.roundResult = "Empate!";
        this.round += 1;
  
      } else if (optionComputer == 'rock') {
        this.roundResult = "Você perdeu!";
        this.computerPoints += 1;
        this.round += 1;
  
      } else {
        this.roundResult = "Você venceu!";
        this.playerPoints += 1;
        this.round += 1;
  
      }

    }

  }

  async atualizarPagina(event) {

    this.playerPoints = 0;
    this.computerPoints = 0;
    this.round = 0;
    this.roundResult = "";
    this.chosenOption = "../../assets/rock.svg";
    this.chooseComputer = "../../assets/rock.svg";

    await event.target.complete();
  }

}
