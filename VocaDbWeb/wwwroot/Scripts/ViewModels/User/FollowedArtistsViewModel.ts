import RatedSongForUserForApiContract from '../../DataContracts/User/RatedSongForUserForApiContract';
import ResourceRepository from '../../Repositories/ResourceRepository';
import ServerSidePagingViewModel from '../ServerSidePagingViewModel';
import TagFilters from '../Search/TagFilters'
import TagRepository from '../../Repositories/TagRepository';
import UserRepository from '../../Repositories/UserRepository';

	export default class FollowedArtistsViewModel {

		constructor(private userRepo: UserRepository,
			private resourceRepo: ResourceRepository,
			tagRepo: TagRepository,
			private languageSelection: string, private loggedUserId: number, private cultureCode: string) {

			this.tagFilters = new TagFilters(tagRepo, languageSelection);

			this.paging.page.subscribe(this.updateResultsWithoutTotalCount);
			this.paging.pageSize.subscribe(this.updateResultsWithTotalCount);
			this.artistType.subscribe(this.updateResultsWithTotalCount);
			this.tagFilters.tags.subscribe(this.updateResultsWithTotalCount);

		}

		public init = () => {

			if (this.isInit)
				return;

			this.resourceRepo.getList(this.cultureCode, ['artistTypeNames'], resources => {
				this.resources(resources);
				this.updateResultsWithTotalCount();
				this.isInit = true;
			});

		};

		public artistType = ko.observable("Unknown");
		public isInit = false;
		public loading = ko.observable(true); // Currently loading for data
		public page = ko.observableArray<RatedSongForUserForApiContract>([]); // Current page of items
		public paging = new ServerSidePagingViewModel(20); // Paging view model
		public pauseNotifications = false;
		public resources = ko.observable<any>();
		public tagFilters: TagFilters;

		public updateResultsWithTotalCount = () => this.updateResults(true);
		public updateResultsWithoutTotalCount = () => this.updateResults(false);

		public updateResults = (clearResults: boolean = true) => {

			// Disable duplicate updates
			if (this.pauseNotifications)
				return;

			this.pauseNotifications = true;
			this.loading(true);

			if (clearResults)
				this.paging.page(1);

			var pagingProperties = this.paging.getPagingProperties(clearResults);

			this.userRepo.getFollowedArtistsList(this.loggedUserId, pagingProperties, this.languageSelection,
				this.tagFilters.tagIds(),
				this.artistType(),
				(result: any) => {

					this.pauseNotifications = false;

					if (pagingProperties.getTotalCount)
						this.paging.totalItems(result.totalCount);

					this.page(result.items);
					this.loading(false);

				});

		}

	}