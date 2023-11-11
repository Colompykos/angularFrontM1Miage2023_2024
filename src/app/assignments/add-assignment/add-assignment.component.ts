import { Component, OnInit/*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  constructor( private assignmentsService:AssignmentsService, private router:Router){}

  // @Output() nouvelAssignment =new EventEmitter<Assignment>();
  newAss:Assignment

  
  nomDevoir:string = "";
  
  datedeRendu!: Date;
  rendu!:boolean;
  id:number


  onSubmit(e:any){
    e.preventDefault();
    // console.log('submitted');
    // console.log(this.nomDevoir);
    // console.log(this.dateDeRendu);

    const newAss:Assignment = new Assignment()
    newAss.id=this.assignmentsService.getNewId();
    newAss.nom = this.nomDevoir;
    newAss.dateDeRendu = this.datedeRendu;
    newAss.rendu=this.rendu;

   // this.nouvelAssignment.emit(newAss);

   this.assignmentsService.addAssignment(newAss)
   .subscribe((message)=> console.log(message));

    this.router.navigate(['home'])

  }

  
}
