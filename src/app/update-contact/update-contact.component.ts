import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';
import { DTOContact } from '../model/DTOcontact.interface';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  id : string = "";
  contact !: DTOContact;

  constructor(private route : ActivatedRoute,
    private contactService : ContactService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.contactService.get(this.id).subscribe(
      (data) => {
        this.contact = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateContact() {
    this.contactService.update(this.id, this.contact).subscribe(
      (data) => {
        Swal.fire('Contacto actualizado', 'El contacto ha sido actualizado con exito', 'success').then(
          (e) => {
            this.router.navigate(['/']);
          }
        );
      },
      (error) => {
        Swal.fire('Error !!', 'El contacto no ha podido actualizarse', 'error');
        console.log(error);
      }
    )
  }

}
