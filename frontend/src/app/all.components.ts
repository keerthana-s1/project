import { Component } from '@angular/core';
import { ApiService } from './api.service'
import {AuthService} from './auth.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import { IpServiceService } from './ip-service.service';  

@Component({
  selector: 'all',
  template: `
<div *ngIf="authService.isAuthenticated">
{{ipAddress}}
<mat-expansion-panel hideToggle *ngFor =" let bookmark of apiService.bookmarks" >
    <mat-expansion-panel-header>
      <mat-panel-title>
        {{bookmark.name}}
      </mat-panel-title>
      <mat-panel-description>
      {{bookmark.Category}}
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>
    <button mat-icon-button color="{{findcolor(bookmark.favourite)}}" (click)="changestat(bookmark)"  matTooltip="Add to Favourites">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button  (click)="changevis(bookmark)"  matTooltip="Change Visibility">
        <mat-icon *ngIf="isprivate(bookmark)">lock</mat-icon>
        <mat-icon *ngIf="!isprivate(bookmark)">lock_open</mat-icon>
      </button>
      <button mat-icon-button  matTooltip="Edit" [routerLink]="['/update',bookmark._id]">
      <mat-icon>edit</mat-icon>
    </button>
      <button mat-icon-button  (click)="delete(bookmark); " matTooltip="Delete" onClick="window.location.reload();">
          <mat-icon>delete</mat-icon>
        </button>

        <button mat-icon-button cdkCopyToClipboard={{bookmark.Url}} matTooltip="Copy to Clipboard" (click)="clipboard()">
        <mat-icon>file_copy</mat-icon>
      </button>

    <a href="{{bookmark.Url}}" target="_blank"><button mat-raised-button color="primary" >Visit Site</button></a>
    </p>
  </mat-expansion-panel>
  </div>
   <div>
   <login *ngIf="!authService.isAuthenticated"></login>
   </div>
  `
})
export class AllComponent {
  heartcolor = "black"
  panelOpenState = false;
  ipAddress = ""
  constructor (public apiService :ApiService,private _snackBar: MatSnackBar, public authService : AuthService, private ip:IpServiceService) {}

  ngOnInit() {
     this.apiService.getBMs();
     //this.ip.getIPAddress().subscribe((res:any)=>{  
      //this.ipAddress=res.ip;  
      //this.ipAddress="cat"
   // });  
  }
  changestat(bm)
  {   
      console.log('trying to change')
      bm.favourite = !bm.favourite
      this.apiService.changeStat(bm)
      
      
  }
  isprivate(bm) {
    if(bm.private==true)
    return true 
    else return false
  }
  changevis(bm)
  {   
      console.log('trying to change')
      bm.private = !bm.private
      this.apiService.changeVisStat(bm)
      
      
  }
  findcolor(stat)
  {
      if(stat)
      return "warn"
      else return "black"
  }
  delete(data)
  {
    this.apiService.delBM(data)
    this._snackBar.open('Bookmark Deleted','close ', {
      duration: 2000,
    });
  }
  clipboard(){
    this._snackBar.open('Copied to Clipboard','close ', {
      duration: 2000,
    });
  }
}
