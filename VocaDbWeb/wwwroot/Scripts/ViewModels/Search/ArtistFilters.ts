import { ArtistAutoCompleteParams } from '../../KnockoutExtensions/AutoCompleteParams';
import ArtistFilter from './ArtistFilter';
import ArtistHelper from '../../Helpers/ArtistHelper';
import ArtistRepository from '../../Repositories/ArtistRepository';
import ArtistType from '../../Models/Artists/ArtistType';

	// Manages artist filters for search
	// These can be used wherever artist filtering is needed - search page, rated songs page, song list page
	export default class ArtistFilters {

		constructor(
			private readonly artistRepo: ArtistRepository, 
			childVoicebanks?: boolean) {

			this.artistSearchParams = { acceptSelection: this.selectArtist };

			this.childVoicebanks = ko.observable(childVoicebanks || false);

			this.filters = ko.computed(() => {
				this.artists();
				this.artistParticipationStatus();
				this.childVoicebanks();
				this.includeMembers();
			}).extend({ notify: 'always' });

			this.showChildVoicebanks = ko.computed(() => this.hasSingleArtist() && ArtistHelper.canHaveChildVoicebanks(this.artists()[0].artistType()));
			this.showMembers = ko.computed(() => this.hasSingleArtist() && _.includes(ArtistHelper.groupTypes, this.firstArtist().artistType()));

		}

		public artists = ko.observableArray<ArtistFilter>();
		public artistIds = ko.computed(() => _.map(this.artists(), a => a.id));
		public artistParticipationStatus = ko.observable("Everything");
		public artistSearchParams: ArtistAutoCompleteParams;
		public childVoicebanks: KnockoutObservable<boolean>;
		public filters: KnockoutComputed<void>;
		public hasMultipleArtists = ko.computed(() => this.artists().length > 1);
		public hasSingleArtist = ko.computed(() => this.artists().length === 1);
		public includeMembers = ko.observable(false);

		private firstArtist = () => this.artists()[0];

		public selectArtist = (selectedArtistId: number) => {
			this.selectArtists([selectedArtistId]);
		}

		public selectArtists = (selectedArtistIds: number[]) => {

			if (!selectedArtistIds)
				return;

			var filters = _.map(selectedArtistIds, a => new ArtistFilter(a));
			ko.utils.arrayPushAll(this.artists, filters);

			if (!this.artistRepo)
				return;

			_.forEach(filters, newArtist => {

				var selectedArtistId = newArtist.id;

				this.artistRepo.getOne(selectedArtistId, artist => {
					newArtist.name(artist.name);
					newArtist.artistType(ArtistType[artist.artistType]);
				});

			});

		};

		public showChildVoicebanks: KnockoutComputed<boolean>;
		public showMembers: KnockoutComputed<boolean>;

	}