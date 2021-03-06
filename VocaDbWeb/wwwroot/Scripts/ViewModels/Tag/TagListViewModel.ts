import EntryUrlMapper from '../../Shared/EntryUrlMapper';
import TagUsageForApiContract from '../../DataContracts/Tag/TagUsageForApiContract';

	export default class TagListViewModel {
		
		private static maxDisplayedTags = 4;

		constructor(tagUsages: TagUsageForApiContract[]) {
			
			this.tagUsages = ko.observableArray([]);
			this.updateTagUsages(tagUsages);

			if (tagUsages.length <= TagListViewModel.maxDisplayedTags + 1)
				this.expanded(true);

			this.displayedTagUsages = ko.computed(() =>
				(this.expanded() ? this.tagUsages() : _.take(this.tagUsages(), TagListViewModel.maxDisplayedTags))
			);

			this.tagUsagesByCategories = ko.computed(() => {
				var tags = _.chain(this.tagUsages())
					.orderBy(tagUsage => tagUsage.tag.categoryName)
					.groupBy(tagUsage => tagUsage.tag.categoryName)
					.map((tagUsages: TagUsageForApiContract[], categoryName: string) => ({ categoryName, tagUsages }));

				var genres = tags.filter(c => c.categoryName === "Genres").value();
				var empty = tags.filter(c => c.categoryName === "").value();

				return _.chain(genres)
					.concat(tags.filter(c => c.categoryName !== "Genres" && c.categoryName !== "").value())
					.concat(empty)
					.value();
			});

		}

		public displayedTagUsages: KnockoutComputed<TagUsageForApiContract[]>;

		public getTagUrl = (tag: TagUsageForApiContract) => {
			return EntryUrlMapper.details_tag(tag.tag.id, tag.tag.urlSlug);
		}

		public expanded = ko.observable(false);

		public tagUsages: KnockoutObservableArray<TagUsageForApiContract>;

		public updateTagUsages = (usages: TagUsageForApiContract[]) => {
			this.tagUsages(_.chain(usages).sortBy(u => u.tag.name.toLowerCase()).sortBy(u => -u.count).value());
		}

		public tagUsagesByCategories: KnockoutComputed<{ categoryName: string, tagUsages: TagUsageForApiContract[] }[]>;

	}