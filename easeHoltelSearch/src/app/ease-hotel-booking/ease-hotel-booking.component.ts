import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, map, startWith } from 'rxjs';

export interface User {
  name: string;
}

const now = new Date();

@Component({
  selector: 'app-ease-hotel-booking',
  templateUrl: './ease-hotel-booking.component.html',
  styleUrls: ['./ease-hotel-booking.component.css']
})

export class EaseHotelBookingComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) { }

  private modalRefPosition: any = undefined
  closeResult: string = ""
  arrowIconSubject = new BehaviorSubject('arrow_drop_down');
  filteredOptions: any;
  @ViewChild('inputAutoCompleteFrom') inputAutoCompleteFrom: any;
  @ViewChild('inputAutoCompleteTo') inputAutoCompleteTo: any;

  hotelBooking = this.fb.group({
    oneWay: [''],
    roundTrip: [''],
    fromCity: ['', Validators.required],
    toCity: ['', Validators.required],
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
    decrementData: ['', Validators.maxLength(9)]
  })

  // city picker data start *************

  optionsList: User[] = [
    { name: "Delhi, India (DEL)" },
    { name: "Mumbai, India (BOM)" },
    { name: "Gorakhpur, India (GOP)" },
    { name: "Bengaluru, India (BLR)" },
    { name: "Goa, India (GOI)" },
    { name: "Lucknow, India (LKO)" },
    { name: "Kolkata, India (CCU)" },
  ];

  filterDataFrom() {
    this.filteredOptions = this.hotelBooking.controls['fromCity'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.name)),
      map(name => (name ? this._filter(name) : this.optionsList.slice())),
    );
  }

  filterDataTo() {
    this.filteredOptions = this.hotelBooking.controls['toCity'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.name)),
      map(name => (name ? this._filter(name) : this.optionsList.slice())),
    );
  }

  clearInputFrom(evt: any): void {
    evt.stopPropagation();
    this.hotelBooking.controls['fromCity']?.reset();
    this.inputAutoCompleteFrom?.nativeElementFrom.focus();
  }

  clearInputTo(evt: any): void {
    evt.stopPropagation();
    this.hotelBooking.controls['toCity']?.reset();
    this.inputAutoCompleteTo?.nativeElementTo.focus();
  }

  displayFnFrom(user: User): string {
    return user && user.name ? user.name : '';
  }

  displayFnTo(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.optionsList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  // city picker data End *************

  // Date picker Start *************

  minDate: any = new Date()
  model: NgbDateStruct | undefined
  date: { year: number; month: number; } | undefined

  selectDate() {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }

  // Date picker End *************

  oneTab: any = 'oneWayTab1'
  toggleButton: boolean = false
  disableBtn(oneWayCheck: any) {
    if(oneWayCheck==1){
      this.toggleButton = !this.toggleButton
      this.oneTab = 'adultTab1';
    } else {
      this.oneTab = 'adultTab2'
    }
  }

  //  Travellers data start from here *************

  adultTab : any = 'adultTab1';
  childTab: any = 'childTab0'
  infantsTab: any = 'infantsTab0'
  travelClassData: any = 'travelClassData1'
  adultsData: number = 1
  btnSubmitAdults(adultsCheck: any) {
    let adults = adultsCheck
    this.adultsData = adults * 1
    if(adults==1){
      this.adultTab = 'adultTab1';
    } else if(adults==2){
      this.adultTab = 'adultTab2';
    }else if(adults==3){
      this.adultTab = 'adultTab3';
    }else if(adults==4){
      this.adultTab = 'adultTab4';
    }else if(adults==5){
      this.adultTab = 'adultTab5';
    }else if(adults==6){
      this.adultTab = 'adultTab6';
    }else if(adults==7){
      this.adultTab = 'adultTab7';
    }else if(adults==8){
      this.adultTab = 'adultTab8';
    } else{
      this.adultTab = 'adultTab9';
    }

  }

  childrensData: number = 0
  btnSubmitChildrens(childCheck: any) {
    let childrens = childCheck
    this.childrensData = childrens * 1
    console.log(this.childrensData)

    if(childrens==0){
      this.childTab = 'childTab0';
    } else if(childrens==1){
        this.childTab = 'childTab1';
    } else if(childrens==2){
        this.childTab = 'childTab2';
    } else if(childrens==3){
        this.childTab = 'childTab3';
    } else if(childrens==4){
        this.childTab = 'childTab4';
    } else if(childrens==5){
        this.childTab = 'childTab5';
    } else{
        this.childTab = 'childTab6';
    }

  }

  infantsData: any = 0
  btnSubmitInfants(infantsCheck: any) {
    let infants = infantsCheck
    this.infantsData = infants * 1

    if(infants==0){
      this.infantsTab = 'infantsTab0';
    } else if(infants==1){
        this.infantsTab = 'infantsTab1';
    } else if(infants==2){
        this.infantsTab = 'infantsTab2';
    } else if(infants==3){
        this.infantsTab = 'infantsTab3';
    } else if(infants==4){
        this.infantsTab = 'infantsTab4';
    } else if(infants==5){
        this.infantsTab = 'infantsTab5';
    } else{
        this.infantsTab = 'infantsTab6';
    }
  }
  is_clicked: boolean = false
  applySubmit() {
    this.is_clicked = !this.is_clicked
  }
  
  travelClassShowData: any = 'Economy/ Premium Economy'
  travelClass(travelClassCheck: any) {
    this.travelClassShowData = travelClassCheck
    console.log(this.travelClassShowData);
    
    if(this.travelClassShowData == 'Economy/ Premium Economy') {
      this.travelClassData = 'travelClassData1'
    } else if(this.travelClassShowData == 'Premium Economy') {
      this.travelClassData = 'travelClassData2'
    } else {
      this.travelClassData = 'travelClassData3'
    }

  }

//  Travellers data End here *************


  ngOnInit(): void {
    this.selectDate()
    this.filterDataFrom()
    this.filterDataTo()
  }

  adults_step: number = 1;
  adults_min: number = 1;
  adults_max: number = 9;
  adults_wrap: boolean = false;

  child_step: number = 1;
  child_min: number = 0;
  child_max: number = 6;
  child_wrap: boolean = false;

  infats_step: number = 1;
  infats_min: number = 0;
  infats_max: number = 6;
  infats_wrap: boolean = false;

  adultIncrementValue(step: number = 1): void {
    let inputValue = this.adultsData + step;
    this.adultsData = inputValue;
  }

  wrappedValue(inputValue: any): number {
    if (inputValue > this.adults_max) {
      return this.adults_min + inputValue - this.adults_max;
    }
    if (inputValue < this.adults_min) {
      if (this.adults_max === Infinity) {
        return 0;
      }
      return this.adults_max + inputValue;
    }
    return inputValue;
  }

  shouldDisableDecrement(inputValue: number): boolean {
    return !this.adults_wrap && inputValue <= this.adults_min;
  }

  shouldDisableIncrement(inputValue: number): boolean {
    return !this.adults_wrap && inputValue >= this.adults_max;
  }

  // child

  childIncrementValue(step: number = 1): void {
    let inputValue = this.childrensData + step;
    this.childrensData = inputValue;
  }

  childWrappedValue(inputValue: any): number {
    if (inputValue > this.child_max) {
      return this.child_min + inputValue - this.child_max;
    }
    if (inputValue < this.child_min) {
      if (this.child_max === Infinity) {
        return 0;
      }
      return this.child_max + inputValue;
    }
    return inputValue;
  }

  childShouldDisableDecrement(inputValue: number): boolean {
    return !this.child_wrap && inputValue <= this.child_min;
  }

  childShouldDisableIncrement(inputValue: number): boolean {
    return !this.child_wrap && inputValue >= this.child_max;
  }

  // infants

  infantsIncrementValue(step: number = 1): void {
    let inputValue = this.infantsData + step;
    this.infantsData = inputValue;
  }

  infantsWrappedValue(inputValue: any): number {
    if (inputValue > this.infats_max) {
      return this.infats_min + inputValue - this.infats_max;
    }
    if (inputValue < this.infats_min) {
      if (this.infats_max === Infinity) {
        return 0;
      }
      return this.infats_max + inputValue;
    }
    return inputValue;
  }

  infantsShouldDisableDecrement(inputValue: number): boolean {
    return !this.infats_wrap && inputValue <= this.infats_min;
  }

  infantsShouldDisableIncrement(inputValue: number): boolean {
    return !this.infats_wrap && inputValue >= this.infats_max;
  }

  // Extra code which is not use in the project start here

  // filterButtons = [
  //   { text: 'one way', isClicked: false },
  //   { text: 'Round Trip', isClicked: false },
  // ]

  // setActive(button: any): void {
  //   for(let but of this.filterButtons) {
  //     but.isClicked = false;
  //     console.log(but)
  //   }
  //   console.log(button)
  //   button.isClicked = true;
  // }

  // Extra code which is not use in the project End here


}
