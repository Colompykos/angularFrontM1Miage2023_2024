import { Component } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitter';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent {
  ajoutActive: boolean = false;

  nomDevoir: string = '';

  datedeRendu: Date = new Date('2023-01-01');

  rendu: boolean = false;

  assignementSelectionne!: Assignment;

  // formVisible = false;

  assignments!:Assignment[]

  isConnected: boolean=false;
  

  constructor(private assignmentsService: AssignmentsService,
    public authService:AuthService,
    private router:Router) {}

  ngOnInit(): void {
    //  this.assignments = this.assignmentsService.getAssignments();
    Emitters.authEmitter.subscribe((connected: boolean) => {
      this.isConnected = connected;
      console.log(this.isConnected);
    });
    
    this.getAssignments()
    
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);

  }
  getAssignments(){
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });


  }



  onSubmit(e: any) {
    // console.log('submitted');
    // console.log(this.nomDevoir);
    // console.log(this.dateDeRendu);

    const newAss: Assignment = new Assignment();
    newAss.nom = this.nomDevoir;
    newAss.dateDeRendu = this.datedeRendu;
    newAss.rendu = this.rendu;

    this.assignments.push(newAss);
  }

  assignmentClique(assignment: Assignment) {
    // console.log("clicked");
    this.assignementSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    // this.formVisible = true;
  }

  // onNouvelAssignement(event: Assignment) {
  //   // this.assignments.push(event);
  //   this.assignmentsService.addAssignment(event)
  //   .subscribe((message) => console.log(message));

  //   // this.formVisible=false;
    
  // }

  ondeletedAssignment(event:Assignment){
    this.assignments.forEach((item,index)=>{
      if(item===event) this.assignments.splice(index,1);
    });
  this.assignementSelectionne != null
  }

  addAssignment(){
    this.router.navigate(['/add']);
  }

}
