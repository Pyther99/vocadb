import AdvancedSearchFilters from '../Search/AdvancedSearchFilters';
import ArtistFilters from '../Search/ArtistFilters';
import ArtistRepository from '../../Repositories/ArtistRepository';
import CommentContract from '../../DataContracts/CommentContract';
import ContentLanguagePreference from '../../Models/Globalization/ContentLanguagePreference';
import EditableCommentsViewModel from '../EditableCommentsViewModel';
import EntryType from '../../Models/EntryType';
import EntryUrlMapper from '../../Shared/EntryUrlMapper';
import PlayListRepositoryForSongListAdapter from '../Song/PlayList/PlayListRepositoryForSongListAdapter';
import PlayListViewModel from '../Song/PlayList/PlayListViewModel';
import PVPlayersFactory from '../PVs/PVPlayersFactory';
import PVPlayerViewModel from '../PVs/PVPlayerViewModel';
import PVServiceIcons from '../../Models/PVServiceIcons';
import ResourceRepository from '../../Repositories/ResourceRepository';
import ResourcesManager from '../../Models/ResourcesManager';
import ServerSidePagingViewModel from '../ServerSidePagingViewModel';
import SongInListContract from '../../DataContracts/Song/SongInListContract';
import SongListRepository from '../../Repositories/SongListRepository';
import { SongOptionalField } from '../../Models/EntryOptionalFields';
import { SongOptionalFields } from '../../Models/EntryOptionalFields';
import SongRepository from '../../Repositories/SongRepository';
import SongType from '../../Models/Songs/SongType';
import SongWithPreviewViewModel from '../Song/SongWithPreviewViewModel';
import TagBaseContract from '../../DataContracts/Tag/TagBaseContract';
import TagFilter from '../Search/TagFilter';
import TagListViewModel from '../Tag/TagListViewModel';
import TagsEditViewModel from '../Tag/TagsEditViewModel';
import TagUsageForApiContract from '../../DataContracts/Tag/TagUsageForApiContract';
import ui from '../../Shared/MessagesTyped';
import UrlMapper from '../../Shared/UrlMapper';
import UserRepository from '../../Repositories/UserRepository';

	export default class SongListViewModel {

		constructor(
			urlMapper: UrlMapper,
			private songListRepo: SongListRepository,
			private songRepo: SongRepository,
			private userRepo: UserRepository,
			private artistRepo: ArtistRepository,
			resourceRepo: ResourceRepository,
			defaultSortRuleName: string,
			latestComments: CommentContract[],
			loggedUserId: number,
			private languageSelection: ContentLanguagePreference,
			cultureCode: string,
			private listId: number,
			tagUsages: TagUsageForApiContract[],
			pvPlayersFactory: PVPlayersFactory,
			canDeleteAllComments: boolean) {

			this.artistFilters = new ArtistFilters(this.artistRepo, false);
			this.comments = new EditableCommentsViewModel(songListRepo.getComments(), listId, loggedUserId, canDeleteAllComments, canDeleteAllComments, false, latestComments, true);

			this.resourceManager = new ResourcesManager(resourceRepo, cultureCode);
			this.resourceManager.loadResources(null, "songSortRuleNames");
			this.sortName = ko.computed(() => {

				if (this.sort() === "")
					return defaultSortRuleName;

				return this.resourceManager.resources().songSortRuleNames != null ? this.resourceManager.resources().songSortRuleNames[this.sort()] : "";

			});

			this.tagIds = ko.computed(() => _.map(this.tags(), t => t.id));

			// TODO
			this.pvPlayerViewModel = new PVPlayerViewModel(urlMapper, songRepo, userRepo, pvPlayersFactory);
			var playListRepoAdapter = new PlayListRepositoryForSongListAdapter(songListRepo, listId,
				this.query, this.songType, this.tagIds, this.childTags, this.artistFilters.artistIds,
				this.artistFilters.artistParticipationStatus, this.artistFilters.childVoicebanks, this.advancedFilters.filters,
				this.sort);
			this.playlistViewModel = new PlayListViewModel(urlMapper, playListRepoAdapter, songRepo, userRepo, this.pvPlayerViewModel, languageSelection);
			this.pvServiceIcons = new PVServiceIcons(urlMapper);

			this.advancedFilters.filters.subscribe(this.updateResultsWithTotalCount);
			this.artistFilters.artists.subscribe(this.updateResultsWithTotalCount);
			this.artistFilters.artistParticipationStatus.subscribe(this.updateResultsWithTotalCount);
			this.artistFilters.childVoicebanks.subscribe(this.updateResultsWithTotalCount);
			this.childTags.subscribe(this.updateResultsWithTotalCount);
			this.showTags.subscribe(this.updateResultsWithoutTotalCount);
			this.paging.page.subscribe(this.updateResultsWithoutTotalCount);
			this.paging.pageSize.subscribe(this.updateResultsWithTotalCount);
			this.songType.subscribe(this.updateResultsWithTotalCount);

			this.tagsEditViewModel = new TagsEditViewModel({
				getTagSelections: callback => userRepo.getSongListTagSelections(this.listId, callback),
				saveTagSelections: tags => userRepo.updateSongListTags(this.listId, tags, this.tagUsages.updateTagUsages)
			}, EntryType.SongList);

			this.tags.subscribe(this.updateResultsWithTotalCount);

			this.tagUsages = new TagListViewModel(tagUsages);

			this.sort.subscribe(() => this.updateCurrentMode(true));
			this.playlistMode.subscribe(() => this.updateCurrentMode(true));
			this.query.subscribe(() => this.updateCurrentMode(true));

			this.updateResultsWithTotalCount();

		}

		public addTag = (tag: TagBaseContract) => this.tags.push(new TagFilter(tag.id, tag.name, tag.urlSlug));

		public advancedFilters = new AdvancedSearchFilters();
		public artistFilters: ArtistFilters;
		public childTags = ko.observable(false);
		public comments: EditableCommentsViewModel;

		public loading = ko.observable(true); // Currently loading for data

		public mapTagUrl = (tagUsage: TagUsageForApiContract) => {
			return EntryUrlMapper.details_tag(tagUsage.tag.id, tagUsage.tag.urlSlug);
		}

		public page = ko.observableArray<SongInListContract>([]); // Current page of items
		public paging = new ServerSidePagingViewModel(20); // Paging view model
		public pauseNotifications = false;
		public playlistMode = ko.observable(false);
		public playlistViewModel: PlayListViewModel;
		public pvPlayerViewModel: PVPlayerViewModel;
		public pvServiceIcons: PVServiceIcons;
		public query = ko.observable("");
		private resourceManager: ResourcesManager;
		public showAdvancedFilters = ko.observable(false);
		public showTags = ko.observable(false);
		public sort = ko.observable("");
		public sortName: KnockoutComputed<string>;
		public songType = ko.observable(SongType[SongType.Unspecified]);
		public tagsEditViewModel: TagsEditViewModel;
		public tags = ko.observableArray<TagFilter>();
		public tagIds: KnockoutComputed<number[]>;
		public tagUsages: TagListViewModel;

		public updateResultsWithTotalCount = () => this.updateResults(true);
		public updateResultsWithoutTotalCount = () => this.updateResults(false);

		private updateCurrentMode = (clearResults: boolean) => {
			
			if (this.playlistMode()) {
				this.playlistViewModel.updateResultsWithTotalCount();				
			} else {
				this.updateResults(clearResults);
			}

		}

		public updateResults = (clearResults: boolean = true) => {

			// Disable duplicate updates
			if (this.pauseNotifications)
				return;

			this.pauseNotifications = true;
			this.loading(true);

			if (clearResults)
				this.paging.page(1);

			var pagingProperties = this.paging.getPagingProperties(clearResults);

			var fields = [SongOptionalField.AdditionalNames, SongOptionalField.ThumbUrl];

			if (this.showTags())
				fields.push(SongOptionalField.Tags);

			this.songListRepo.getSongs(this.listId, this.query(),
				this.songType() !== SongType[SongType.Unspecified] ? this.songType() : null,
				this.tagIds(),
				this.childTags(),
				this.artistFilters.artistIds(),
				this.artistFilters.artistParticipationStatus(),
				this.artistFilters.childVoicebanks(),
				this.advancedFilters.filters(),
				null, pagingProperties,
				new SongOptionalFields(fields),
				this.sort(),
				this.languageSelection,
				(result) => {

					_.each(result.items, (item) => {

						var song = item.song;
						var songAny: any = song;

						if (song.pvServices && song.pvServices != 'Nothing') {
							songAny.previewViewModel = new SongWithPreviewViewModel(this.songRepo, this.userRepo, song.id, song.pvServices);
							songAny.previewViewModel.ratingComplete = ui.showThankYouForRatingMessage;
						} else {
							songAny.previewViewModel = null;
						}

					});

					this.pauseNotifications = false;

					if (pagingProperties.getTotalCount)
						this.paging.totalItems(result.totalCount);

					this.page(result.items);
					this.loading(false);

				});

		}

	}