export interface IOrder {
	id?: string;
	title?: string;
	image?: string;
	description?: string;
	year?: string;
	score?: string;
	trailer?: string;
	gameplay?: string;
	favorites?: string;
}
export interface AdvancedSearchParams {
	take: number;
	skip: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	orderBy?: any;
}
