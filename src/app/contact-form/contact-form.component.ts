import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DTOContact } from '../model/DTOcontact.interface';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactData : DTOContact = {
    name: '',
    email: ''
  }

  constructor(
    private contactService : ContactService, 
    private snack : MatSnackBar,
    private router : Router) { }

  ngOnInit(): void {
  }

  save() {
    if(this.contactData.name.trim() == '' || this.contactData.name == null) {
      this.snack.open('El nombre es requerido', '' ,{
        duration : 3000
      })
      return;
    }
    if(this.contactData.email.trim() == '' || this.contactData.email == null) {
      this.snack.open('El email es requerido', '' ,{
        duration : 3000
      })
      return;
    }

    this.contactService.create(this.contactData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Contacto guardado', 'El contacto ha sido guardado con exito', 'success');
        this.contactData = {
          name : '',
          email : ''
        }
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Ha ocurrido un error mientras se agregaba el contacto', 'error');
      }
    )
  }

}
