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

const ordering = (order: string, sort: string): IOrder => {
	let orderBy: IOrder;

	switch (order) {
		case "id":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						id: "asc",
					};
					break;
				default:
					orderBy = {
						id: "desc",
					};
					break;
			}
			break;
		case "title":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						title: "asc",
					};
					break;
				default:
					orderBy = {
						title: "desc",
					};
					break;
			}
			break;
		case "image":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						image: "asc",
					};
					break;
				default:
					orderBy = {
						image: "desc",
					};
					break;
			}
			break;
		case "description":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						description: "asc",
					};
					break;
				default:
					orderBy = {
						description: "desc",
					};
					break;
			}
			break;
		case "year":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						year: "asc",
					};
					break;
				default:
					orderBy = {
						year: "desc",
					};
					break;
			}
			break;
		case "score":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						score: "asc",
					};
					break;
				default:
					orderBy = {
						score: "desc",
					};
					break;
			}
			break;
		case "trailer":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						trailer: "asc",
					};
					break;
				default:
					orderBy = {
						trailer: "desc",
					};
					break;
			}
			break;
		case "gameplay":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						gameplay: "asc",
					};
					break;
				default:
					orderBy = {
						gameplay: "desc",
					};
					break;
			}
			break;
		case "favorites":
			switch (sort.toLowerCase()) {
				case "asc":
					orderBy = {
						favorites: "asc",
					};
					break;
				default:
					orderBy = {
						favorites: "desc",
					};
					break;
			}
			break;

		default:
			orderBy = {
				title: "asc",
			};
			break;
	}
	return orderBy;
};

export default ordering;
