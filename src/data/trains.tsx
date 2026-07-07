export const cities = [
  "Tallinn",
  "Riga",
  "Vilnius",
  "Warsaw",
  "Berlin",
  "Paris",
  "London",
];

const templates = [
  {
    name: "22426 - VANDE BHARAT",
    departureTime: "08:00",
    arrivalTime: "12:30 ",
    duration: "4h 30m",
    departureDate: "16 NOV",
    arrivalDate: "16 NOV",
    runsOn: "Everyday",
    prices: [800, 1000, 1200],
    seats: ["Avl - 046", "Avl - 006", "WL - 36"],
  },
  {
    name: "22412 - ARUNACHAL EXP",
    departureTime: "13:15",
    arrivalTime: "6:00",
    duration: "4h 45m",
    departureDate: "16 NOV",
    arrivalDate: "16 NOV",
    runsOn: "Everyday",
    prices: [800, 1000, 1400],
    seats: ["Avl - 046", "Avl - 006", "WL - 36"],
  },
  {
    name: "12572 - SHATABDI EXPRESS",
    departureTime: "22:00",
    arrivalTime: "06:30",
    duration: "8h 30m",
    departureDate: "16 NOV",
    arrivalDate: "16 NOV",
    runsOn: "Everyday",
    prices: [800, 1000, 1300],
    seats: ["AvI - 047", "AvI - 009", "WK - 38"],
  },
];
type Train = {
  id: number;
  number: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  runsOn: string;
  
  classes: {
    type: string;
    price: number;
    seats: string;
    color: string ;
  }[];

};

export const trains: Train[] = [];
let id = 1;
cities.forEach((from) => {
  cities.forEach((to) => {
    if (from === to) return;
    templates.forEach((template) => {
      trains.push({
        id: id++,
        number: `EC${100 + id}`,
        name: template.name,
        from,
        to,
        departureTime: template.departureTime,
        arrivalTime: template.arrivalTime,
        duration: template.duration,
        departureDate: template.departureDate,
        arrivalDate: template.arrivalDate,
        runsOn: template.runsOn,
        classes: [
          {
            type: "3A",
            price: template.prices[0],
            color: "green",
            seats: template.seats[0],
          },
          {
            type: "2A",
            price: template.prices[1],
            color:"yellow",
            seats: template.seats[1],
          },
          {
            type: "3A",
            price: template.prices[2],
            color: "orange",
            seats: template.seats[2],
          },
        ],
      });
    });
  });
});