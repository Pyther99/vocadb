import CommentContract from '../DataContracts/CommentContract';
import UserApiContract from '../DataContracts/User/UserApiContract';

	export default class CommentViewModel {
		
		constructor(contract: CommentContract, public canBeDeleted: boolean, public canBeEdited: boolean) {

			this.author = contract.author;
			this.authorName = contract.authorName;
			this.created = contract.created;
			this.id = contract.id;
			this.message = ko.observable(contract.message);

			this.editedMessage = ko.observable(null);
			
		}

		public author: UserApiContract;

		public authorName: string;

		public beginEdit = () => {
			this.editedMessage(this.message());
		}

		public created: Date;

		public editedMessage: KnockoutObservable<string>;

		public id: number;

		public message: KnockoutObservable<string>;

		public saveChanges = () => {
			this.message(this.editedMessage());
		}

		public toContract: () => CommentContract = () => {
			return { id: this.id, message: this.message(), author: this.author };
		}

	}