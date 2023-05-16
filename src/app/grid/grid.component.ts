import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DoorsData } from '../models/door-list';
import { Entry } from '../models/entries';
import { GuestData } from '../models/guest-list';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Generator from '../helpers/generator';
import { Door } from '../models/door';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['door', 'created', 'firstname', 'lastname', 'delete'];
  
  entries: Entry [] = []

  guestList: any

  doorid = new FormControl('');

  startDate = new FormControl(Date, Validators.required);

  endDate = new FormControl(Date, Validators.required);

  filters = {
    doorId: '',
    startDate: new Date(1900,0,0),
    endDate: new Date(1900,0,0),
  }

  entryFilterList: any

  emptyDate = false;

  invalidSearch = false;

  minDate: any;

  maxDate: any;

  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private door: DoorsData, private guest: GuestData, private generator: Generator) {
    this.guestList = this.door.values;
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(2023, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    for (let index = 0; index < 3; index++) {
      this.guest.values.forEach((guest)=>{
        const entry = new Entry(this.door.values[this.generator.generateRandomNumber(0,4)], guest, this.generator.generateRandomDate('01/01/2023', '06/31/2023'))
        entry.id = this.generator.generateRandomNumber(0,100000000).toString()
        this.entries.push(entry)
      })
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.entryFilterList = this.entries
    this.dataSource = new MatTableDataSource(this.entryFilterList);
  }

  selectedDoor(element: Door){
    this.filters.doorId = element.id
  }
  
  filter(){
    this.invalidSearch = false;
    this.emptyDate = false;
    if(this.filters.startDate < new Date(2023, 0, 1) || this.filters.endDate < new Date(2023, 0, 1)){
      this.emptyDate = true;
      return
    }
    
    if(this.filters.endDate < this.filters.startDate ){
      this.invalidSearch = true;
      return
    }

    this.entryFilterList = this.entries.filter(entry =>{
      return (this.filters.doorId == '' || entry.door.id == this.filters.doorId) && (entry.created >= this.filters.startDate && entry.created <= this.filters.endDate)
    });

    this.dataSource = new MatTableDataSource(this.entryFilterList);
    this.minDate = new Date(2023, 0, 1);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStartDate(event: any) {
    if(event.value === null){
      this.minDate = new Date(2023, 0, 1);
      return 
    }
    this.minDate = event.value;
    this.filters.startDate = event.value;
  }

  getEndDate(event: any) {
    console.log(event.value)
    if(event.value === null){

      return 
    }
    this.filters.endDate = event.value;
  }

  reset(){
    this.ngOnInit()
    this.ngAfterViewInit();
  }

  delete(element: any){
    this.entries = this.entries.filter(entry=> entry.id != element.id)
    this.ngOnInit()
    this.ngAfterViewInit();
  }
}
