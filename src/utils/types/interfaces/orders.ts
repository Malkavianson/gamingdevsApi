/**
 * Interface IOrder including all ways to order games in API
 *
 * Note: This does not replace the interface games DTO
 */
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

/**
 * Advanced Search Parameters:
 *
 *   take: how much games per page.
 *
 *   skip: how much games gotta be skipped.
 *
 *   orderBy: IOrder parameter.
 */
export interface AdvancedSearchParams {
	take: number;
	skip: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	orderBy?: any;
}
