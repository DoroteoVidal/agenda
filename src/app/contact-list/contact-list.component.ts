import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts : Contact[] = [];
  columnsToDisplay = ['id', 'name', 'email', 'createdAt', 'buttons'];

  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    this.contactService.getList().subscribe(
      (data) => {
        console.log(data);
        this.contacts = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Ha ocurrido un error mientras se cargaban los contactos', 'error');
      }
    )
  }

  deleteContact(id : string) {
    let contact !: Contact;
    this.contactService.get(id).subscribe((data) => {
      contact = data;
      Swal.fire({
        title : 'Borrar contacto',
        text : `Seguro que quieres borrar a ${contact.name}?`,
        icon : 'warning',
        showCancelButton : true,
        confirmButtonColor : '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Borrar',
        cancelButtonText : 'Cancelar'
      }).then((result) => {
        if(result.isConfirmed) {
          this.contactService.delete(id).subscribe(
            () => {
              this.contacts = this.contacts.filter((contact : any) => contact.id != id);
              Swal.fire('Contacto eliminado', 'El contacto ha sido borrado con exito', 'success');
            },
            (error) => {
              Swal.fire('Error !!', 'Ha ocurrido un error al intentar borrar el contacto', 'error');
              console.log(error);
            }
          )
        }
      })
    })
    
  }

}
