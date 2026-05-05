export type Cars = {
	id?: number;
	brand: string;
	badge?: string;
	model?: string;
	specs?: string;
	bodySilhouette: string;
	price: number | string;
	isFavorite?: boolean;
	image?: string;
	carAlbum?: {
		photo1: string;
		photo2: string;
		photo3: string;
	};
};
