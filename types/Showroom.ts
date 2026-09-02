export type Showroom = {
	id: number;
	city: string;
	address: string;
	phone: string;
	timing: {
		weekdays: string;
		weekends: string;
	};
	mapUrl: string;
};
