export type Cars = {
	id?: number;
	brand: string;
	bodySilhouette: string;
	price: number | string;
	carAlbum: {
		photo1: string;
		photo2: string;
		photo3: string;
	};
};
