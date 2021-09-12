import { Component, Inject, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Dichiaro un'interfaccia dove salvare il contatto
interface Contatto {
  name: any;
  surname: any;
  telephoneNumber: any;
  email: any;
  birthday: any;
}



@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rubrica';

  //Form Controls
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  birthday = new FormControl('', [Validators.required]);

  //Date limiter
  date = new Date();
  currentYear = this.date.getFullYear();
  currentDay = this.date.getUTCDate();
  currentMonth = this.date.getUTCMonth();
  dateLimiter = new Date((this.currentYear - 10), this.currentMonth, this.currentDay);

  //Table columns
  displayedColumns: string[] = ['name', 'surname', 'phonenumber', 'email', 'birthday', 'modify', 'eliminate'];


  contatti: Contatto[] = [];



  constructor(private apiConnection: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.apiConnection.getRubrica().subscribe((r: any) => {
      this.contatti = r;

    })


  }
  //Funzione per salvare un contatto quando la larghezza del sito e' maggiore di 1000px
  saveContact(name: any, surname: any, phone: any, email: any, birthday: any) {

    let contattoDaSalvare: Contatto = {
      name: name,
      surname: surname,
      telephoneNumber: phone,
      email: email,
      birthday: birthday
    }


    console.log(contattoDaSalvare);

  }


  //Apro la modale per registrare un utente
  openRegister(): void {
    const dialogRef = this.dialog.open(DialogBoxModify, {
      width: '300px',
      data: {}

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  openModify(user: Contatto): void {
    const dialogRef = this.dialog.open(DialogBoxModify, {
      width: '300px',
      data: { name: user.name, surname: user.surname, telephoneNumber: user.telephoneNumber, email: user.email, birthday: user.birthday }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }



  openEliminate(user: any): void {
    const dialogRef = this.dialog.open(DialogBoxEliminate, {
      width: '250px',
      data: { name: user.name, surname: user.surname, telephoneNumber: user.telephoneNumber, email: user.telephoneNumber, birthday: user.birthday }


    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}


@Component({

  selector: 'dialogBoxModify',
  templateUrl: 'dialogBoxModify.html',

})

export class DialogBoxModify {

  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  birthday = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogBoxModify>, @Inject(MAT_DIALOG_DATA) public data: Contatto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifyContact(user: Contatto) {
    this.dialogRef.close();

    let contattoDaSalvare: Contatto = {
      name: user.name,
      surname: user.surname,
      telephoneNumber: user.telephoneNumber,
      email:  user.email,
      birthday: user.birthday
    }

    console.log(contattoDaSalvare);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}

@Component({

  selector: 'dialogBoxEliminate',
  templateUrl: 'dialogBoxEliminate.html',

})
export class DialogBoxEliminate {

  constructor(public dialogRef: MatDialogRef<DialogBoxEliminate>, @Inject(MAT_DIALOG_DATA) public data: Contatto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  eliminateContact(user: any) {
    this.dialogRef.close();

    console.log(user + " Contatto eliminato");
  }
}

@Component({

  selector: 'dialogBoxRegister',
  templateUrl: 'dialogBoxRegister.html',

})

export class DialogBoxRegister {

  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  birthday = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogBoxRegister>, @Inject(MAT_DIALOG_DATA) public data: Contatto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveContact(name: any, surname: any, phone: any, email: any, birthday: any) {

    let contattoDaSalvare: Contatto = {
      name: name,
      surname: surname,
      telephoneNumber: phone,
      email: email,
      birthday: birthday
    }


    console.log(contattoDaSalvare);

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}


