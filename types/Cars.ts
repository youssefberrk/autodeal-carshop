
type feature = {
		icon: string;
		title: string;
		description: string;
	}

type color = {
		 id: string;
		 hex: string;
	}

export type Cars = {
	id: number;
	brand: string;
	badge?: string;
	model?: string;
	specs?: string;
	bodySilhouette: string;
	price: number | string;
	availability?: number;
	isFavorite?: boolean;
	image?: string;
	carAlbum?: {
		photo1: string;
		photo2: string;
		photo3: string;
	};
	features?: feature[];
	colors?: color[];
};
