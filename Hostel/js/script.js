
let roomInputSelector = ".form-room__field";
let roomBtnSelector = ".form-room__btn";
let roomFromPickerSelector = ".form-room__field-from";
let roomBeforePickerSelector = ".form-room__field-before";
let roomErrorMessage = '.item-room__error';
class RoomManager {
	constructor(roomNode, id){
		this.id = id;
		this.initFromHtml(roomNode, id);
	}
	initFromHtml(roomNode, id){
		let inputs = roomNode.querySelectorAll(roomInputSelector);
		let submitBtn = roomNode.querySelector(roomBtnSelector);
		let errorMessage = roomNode.querySelector(roomErrorMessage);
		let fromPicker = datepicker(roomNode.querySelector(roomFromPickerSelector), {
			id: id,
			startDay: 1,
			customDays: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
			customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			overlayButton: "Введите дату",
			overlayPlaceholder: 'Введите год (4 цифры)',
			disabler: function (date){
				if (localStorage[id]){
					let start = JSON.parse(localStorage[id]).start;
					let end = JSON.parse(localStorage[id]).end;
					if (date >= Date.parse(start) && date <= Date.parse(end)){
						return true;
					}
				}
				else {
					return false
				}
			},
			formatter: (input, date, instance) => {
				let monthsRus = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
				const value = date.getDate() + " " + monthsRus[date.getMonth()] + " "  + date.getFullYear();
				input.value = value;
			},
			maxDate: new Date(2099, 0, 5),
		});
		let beforePicker = datepicker(roomNode.querySelector(roomBeforePickerSelector), {
			id: id,
			startDay: 1,
			customDays: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
			customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			overlayButton: "Введите дату",
			overlayPlaceholder: 'Введите год (4 цифры)',
			disabler: function (date){
				if (localStorage[id]){
					let start = JSON.parse(localStorage[id]).start;
					let end = JSON.parse(localStorage[id]).end;
					if (date >= Date.parse(start) && date <= Date.parse(end)){
						return true;
					}
				}
				else return false
			},
			formatter: (input, date, instance) => {
				let monthsRus = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
				const value = date.getDate() + " " + monthsRus[date.getMonth()] + " "  + date.getFullYear();
				input.value = value;
			},
			maxDate: new Date(2099, 0, 5),
		});
		this.id = id;
		this.inputs = inputs;
		this.submitBtn = submitBtn;
		this.fromPicker = fromPicker;
		this.beforePicker = beforePicker;
		this.submitBtn.addEventListener("click",(event)=>{
			let selectedStart = this.beforePicker.getRange().start;
			let selectedEnd = this.beforePicker.getRange().end;
			if(selectedStart && selectedEnd){
				errorMessage.classList.remove('active');
				localStorage.setItem(this.id, JSON.stringify({
					start: selectedStart,
					end: selectedEnd,
				}));
				window.location.href = window.location.href;
				console.log(localStorage);
			}
			else {
				errorMessage.classList.add('active');
				event.preventDefault();
			}
		});
	}
}
let roomA = new RoomManager (document.getElementById('room-A'), 'room-A');
let roomB = new RoomManager (document.getElementById('room-B'), 'room-B');
let roomC = new RoomManager (document.getElementById('room-C'), 'room-C');
let roomD = new RoomManager (document.getElementById('room-D'), 'room-D');
let roomE = new RoomManager (document.getElementById('room-E'), 'room-E');
