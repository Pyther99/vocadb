import PagingProperties from '../DataContracts/PagingPropertiesContract';

	export default class ServerSidePagingViewModel {
		
		constructor(pageSize: number = 10) {

			this.pageSize(pageSize);
			this.page.subscribe(this.updateItems);
			this.pageSize.subscribe(this.updateItems);

		}

		updateItems = () => {

			if (!this.getItemsCallback)
				return;

			this.getItemsCallback(this.getPagingProperties(false));

		}

		getItemsCallback: (paging: PagingProperties) => void;


		page = ko.observable(1);

		totalItems = ko.observable(0);

		pageSize = ko.observable(10);


		firstItem = ko.computed(() => (this.page() - 1) * this.pageSize());

		totalPages = ko.computed(() => Math.ceil(this.totalItems() / this.pageSize()));

		public hasMultiplePages = ko.computed(() => this.totalPages() > 1);

		isFirstPage = ko.computed(() => this.page() <= 1);

		isLastPage = ko.computed(() => this.page() >= this.totalPages());

		pages = ko.computed(() => {

			var start = Math.max(this.page() - 4, 1);
			var end = Math.min(this.page() + 4, this.totalPages());

			return _.range(start, end + 1);

		});

		showMoreBegin = ko.computed(() => this.page() > 5);

		showMoreEnd = ko.computed(() => this.page() < this.totalPages() - 4);

		getPagingProperties = (clearResults: boolean = false) => {

			return {
				start: this.firstItem(),
				maxEntries: this.pageSize(),
				getTotalCount: clearResults || this.totalItems() == 0
			};

		}

		goToFirstPage = () => this.page(1);

		goToLastPage = () => this.page(this.totalPages());

		nextPage = () => {
			if (!this.isLastPage())
				this.page(this.page() + 1);
		}

		previousPage = () => {
			if (!this.isFirstPage())
				this.page(this.page() - 1);
		}

	}