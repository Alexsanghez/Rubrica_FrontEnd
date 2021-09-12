import { Component, Inject, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//Dichiaro un'interfaccia con i valori dei contatti
interface Contatto {
  name: string;
  surname: string;
  telephoneNumber: string;
  email: string;
  birthday: Date;
}

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Rubrica';

  //
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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
  dateLimiter = new Date(
    this.currentYear - 10,
    this.currentMonth,
    this.currentDay
  );

  //Table columns
  displayedColumns: string[] = [
    'name',
    'surname',
    'phonenumber',
    'email',
    'birthday',
    'modify',
    'eliminate',
  ];

  //Data
  contatti: Contatto[] = [];
  dataSource = new MatTableDataSource();

  constructor(private apiConnection: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    //Mi iscrivo al servizio che ho creato
    this.apiConnection.getRubrica().subscribe((r: any) => {
      this.contatti = r;
      this.dataSource.data = this.contatti;
    });

    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  //Funzione per salvare un contatto quando la larghezza del sito e' maggiore di 1000px
  saveContact(name: string, surname: string, phone: string, email: string, birthday: Date) {
    let contattoDaSalvare: Contatto = {
      name: name,
      surname: surname,
      telephoneNumber: phone,
      email: email,
      birthday: birthday,
    };

    console.log(contattoDaSalvare);
  }

  //Apro la modale per registrare un utente
  openRegister(): void {
    const dialogRef = this.dialog.open(DialogBoxModify, {
      width: '300px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  //Apro la modale per modificare un utente e gli passo i dati dell'utente selezionato
  openModify(user: Contatto): void {
    const dialogRef = this.dialog.open(DialogBoxModify, {
      width: '300px',
      data: {
        name: user.name,
        surname: user.surname,
        telephoneNumber: user.telephoneNumber,
        email: user.email,
        birthday: user.birthday,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The modify dialog was closed');
    });
  }

  //Apro la modale per eliminare un utente e gli passo i dati dell'utente selezionato
  openEliminate(user: Contatto): void {
    const dialogRef = this.dialog.open(DialogBoxEliminate, {
      width: '250px',
      data: {
        name: user.name,
        surname: user.surname,
        telephoneNumber: user.telephoneNumber,
        email: user.telephoneNumber,
        birthday: user.birthday,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  //Verifica Formato Email
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

//Creo un componente per la modale di modifica
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

  date = new Date();
  currentYear = this.date.getFullYear();
  currentDay = this.date.getUTCDate();
  currentMonth = this.date.getUTCMonth();
  dateLimiter = new Date(
    this.currentYear - 10,
    this.currentMonth,
    this.currentDay
  );

  constructor(
    public dialogRef: MatDialogRef<DialogBoxModify>,
    @Inject(MAT_DIALOG_DATA) public data: Contatto
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Funzione per modificare un contatto
  modifyContact(user: Contatto) {
    let contattoDaSalvare: Contatto = {
      name: user.name,
      surname: user.surname,
      telephoneNumber: user.telephoneNumber,
      email: user.email,
      birthday: user.birthday,
    };

    this.dialogRef.close();
    console.log(contattoDaSalvare);
  }

  //Verifica Formato Email per la modale di modifica
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

//Definisco il componente per la modale di eliminazione del contatto
@Component({
  selector: 'dialogBoxEliminate',
  templateUrl: 'dialogBoxEliminate.html',
})
export class DialogBoxEliminate {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxEliminate>,
    @Inject(MAT_DIALOG_DATA) public data: Contatto
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Funzione per eliminare un contatto
  eliminateContact() {
    this.dialogRef.close();

    console.log(this.data);
    console.log(" Eliminato");
  }
}

//Definisco il componente per la modale di registrazione del contatto
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

  date = new Date();
  currentYear = this.date.getFullYear();
  currentDay = this.date.getUTCDate();
  currentMonth = this.date.getUTCMonth();
  dateLimiter = new Date(
    this.currentYear - 10,
    this.currentMonth,
    this.currentDay
  );



  constructor(
    public dialogRef: MatDialogRef<DialogBoxRegister>,
    @Inject(MAT_DIALOG_DATA) public data: Contatto
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Funzione per salvare il contatto
  saveContact(name: string, surname: string, phone: string, email: string, birthday: Date) {
    let contattoDaSalvare: Contatto = {
      name: name,
      surname: surname,
      telephoneNumber: phone,
      email: email,
      birthday: birthday,
    };

    console.log(contattoDaSalvare);
  }

  //Verifica Formato Email per la modale di Registrazione
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
