import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root',
})
export default class Generator {
	private randomValueBetween(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}
	
	generateRandomNumber(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min)

	}

	generateRandomDate(start: any, end: any) {
		const date1 = start || '01-01-2023'
		const date2 = end || new Date().toLocaleDateString()
		const date11 = new Date(date1).getTime()
		const date22 = new Date(date2).getTime()
		if (date11 > date22) {
			return new Date(this.randomValueBetween(date22, date11))
		} else {
			return new Date(this.randomValueBetween(date11, date22))
		}
	}


}