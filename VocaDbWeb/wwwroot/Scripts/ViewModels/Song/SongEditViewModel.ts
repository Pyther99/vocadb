import { AlbumArtistRolesEditViewModel } from '../Artist/ArtistRolesEditViewModel'
import { ArtistAutoCompleteParams } from '../../KnockoutExtensions/AutoCompleteParams';
import ArtistForAlbumContract from '../../DataContracts/ArtistForAlbumContract';
import ArtistForAlbumEditViewModel from '../ArtistForAlbumEditViewModel';
import ArtistHelper from '../../Helpers/ArtistHelper';
import ArtistRepository from '../../Repositories/ArtistRepository';
import BasicEntryLinkViewModel from '../BasicEntryLinkViewModel';
import CustomNameEditViewModel from '../CustomNameEditViewModel';
import DateTimeHelper from '../../Helpers/DateTimeHelper';
import DeleteEntryViewModel from '../DeleteEntryViewModel';
import EnglishTranslatedStringEditViewModel from '../Globalization/EnglishTranslatedStringEditViewModel';
import EntryType from '../../Models/EntryType';
import { IDialogService } from '../../Shared/DialogService';
import { LyricsForSongListEditViewModel } from './LyricsForSongEditViewModel';
import NamesEditViewModel from '../Globalization/NamesEditViewModel';
import PVListEditViewModel from '../PVs/PVListEditViewModel';
import PVRepository from '../../Repositories/PVRepository';
import PVType from '../../Models/PVs/PVType';
import ReleaseEventContract from '../../DataContracts/ReleaseEvents/ReleaseEventContract';
import { SongAutoCompleteParams } from '../../KnockoutExtensions/AutoCompleteParams';
import SongContract from '../../DataContracts/Song/SongContract';
import SongForEditContract from '../../DataContracts/Song/SongForEditContract';
import SongHelper from '../../Helpers/SongHelper';
import SongRepository from '../../Repositories/SongRepository';
import SongType from '../../Models/Songs/SongType';
import TranslatedEnumField from '../../DataContracts/TranslatedEnumField';
import UrlMapper from '../../Shared/UrlMapper';
import UserRepository from '../../Repositories/UserRepository';
import WebLinksEditViewModel from '../WebLinksEditViewModel';
import Decimal from 'decimal.js-light';
import KnockoutHelper from '../../Helpers/KnockoutHelper';

    export default class SongEditViewModel {

		private albumEventId: number;
		public albumReleaseDate: moment.Moment;
        // List of artist links for this song.
        public artistLinks: KnockoutObservableArray<ArtistForAlbumEditViewModel>;
		artistSearchParams: ArtistAutoCompleteParams;
		public canHaveOriginalVersion: KnockoutComputed<boolean>;
		public defaultNameLanguage: KnockoutObservable<string>;
		public deleted: boolean;
		public editedArtistLink = new CustomNameEditViewModel();
		public eventDate: KnockoutComputed<moment.Moment>;
		public firstPvDate: KnockoutComputed<moment.Moment>;
		public id: number;
        public length: KnockoutObservable<number>;
		public lengthFormatted: KnockoutComputed<string>;
		public lyrics: LyricsForSongListEditViewModel;
		public names: NamesEditViewModel;
		public notes: EnglishTranslatedStringEditViewModel;
		public originalVersion: BasicEntryLinkViewModel<SongContract>;
		public originalVersionSearchParams: SongAutoCompleteParams;
		public originalVersionSuggestions = ko.observableArray<SongContract>();
		public publishDate: KnockoutObservable<Date>;
		public pvs: PVListEditViewModel;
		public releaseEvent: BasicEntryLinkViewModel<ReleaseEventContract>;
		public showLyricsNote: KnockoutComputed<boolean>;
		public songType: KnockoutComputed<SongType>;
		public songTypeStr: KnockoutObservable<string>;
		public status: KnockoutObservable<string>;
		public submittedJson = ko.observable("");
		public submitting = ko.observable(false);
		public suggestedPublishDate: KnockoutComputed<PotentialDate>;
		private tags: number[];
		public updateNotes = ko.observable("");
		public validationExpanded = ko.observable(false);
		public webLinks: WebLinksEditViewModel;
		public hasMaxMilliBpm: KnockoutObservable<boolean>;
		public minMilliBpm: KnockoutObservable<number>;
		public maxMilliBpm: KnockoutObservable<number>;
		public minBpm: KnockoutComputed<string>;
		public maxBpm: KnockoutComputed<string>;

		// Adds a new artist to the album
		// artistId: Id of the artist being added, if it's an existing artist. Can be null, if custom artist.
		// customArtistName: Name of the custom artist being added. Can be null, if existing artist.
		addArtist = (artistId?: number, customArtistName?: string) => {

			if (artistId) {

				this.artistRepository.getOne(artistId, artist => {

					var data: ArtistForAlbumContract = {
						artist: artist,
						isSupport: false,
						name: artist.name,
						id: 0,
						roles: 'Default'
					};

					var link = new ArtistForAlbumEditViewModel(null, data);
					this.artistLinks.push(link);

				});

			} else {

				var data: ArtistForAlbumContract = {
					artist: null,
					name: customArtistName,
					isSupport: false,
					id: 0,
					roles: 'Default'
				};

				var link = new ArtistForAlbumEditViewModel(null, data);
				this.artistLinks.push(link);

			}

		};

		public artistRolesEditViewModel: AlbumArtistRolesEditViewModel;

		// Clears fields that are not valid for the selected song type.
		private clearInvalidData = () => {

			if (!this.canHaveOriginalVersion()) {
				this.originalVersion.clear();
			}
				
		}

		public customizeName = (artistLink: ArtistForAlbumEditViewModel) => {
			this.editedArtistLink.open(artistLink);
		}

		public deleteViewModel = new DeleteEntryViewModel(notes => {
			$.ajax(this.urlMapper.mapRelative("api/songs/" + this.id + "?notes=" + encodeURIComponent(notes)), { type: 'DELETE', success: () => {
				window.location.href = this.urlMapper.mapRelative("/Song/Details/" + this.id);
			}});
		});

		public editArtistRoles = (artist: ArtistForAlbumEditViewModel) => {
			this.artistRolesEditViewModel.show(artist);
		}

		public async findOriginalSongSuggestions() {

			this.originalVersionSuggestions.removeAll();

			const names = _.map(this.names.getPrimaryNames().length ? this.names.getPrimaryNames() : this.names.getAllNames(), n => n.value());
			const [all, originals] = await Promise.all([this.songRepository.getByNames(names, [this.id]), this.songRepository.getByNames(names, [this.id], [SongType.Original, SongType.Remaster])]);

			const suggestions = _.chain(originals).unionBy(all, i => i.id).take(3).value();

			this.originalVersionSuggestions(suggestions);

		}

		public hasAlbums: boolean;

		// Removes an artist from this album.
		public removeArtist = (artist: ArtistForAlbumEditViewModel) => {
			this.artistLinks.remove(artist);
		};

		public selectOriginalVersion = (song: SongContract) => {
			this.originalVersion.entry(song);
		}

		public submit = () => {

			if (this.hasValidationErrors() && this.status() !== "Draft"
				&& this.dialogService.confirm(vdb.resources.entryEdit.saveWarning) === false) {
				
				return false;

			}

			this.clearInvalidData();

			this.submitting(true);

			var submittedModel: SongForEditContract = {
				artists: _.map(this.artistLinks(), artist => artist.toContract()),
				defaultNameLanguage: this.defaultNameLanguage(),
				deleted: this.deleted,
				hasAlbums: this.hasAlbums,
				id: this.id,
				lengthSeconds: this.length(),
				lyrics: this.lyrics.toContracts(),
				names: this.names.toContracts(),
				notes: this.notes.toContract(),
				originalVersion: this.originalVersion.entry(),
				publishDate: (this.publishDate() ? this.publishDate().toISOString() : null),
				pvs: this.pvs.toContracts(),
				releaseEvent: this.releaseEvent.entry(),
				songType: this.songTypeStr(),
				status: this.status(),
				tags: this.tags,
				updateNotes: this.updateNotes(),
				webLinks: this.webLinks.toContracts(),
				minMilliBpm: this.minMilliBpm(),
				maxMilliBpm: this.hasMaxMilliBpm() ? this.maxMilliBpm() : null,
			};

			this.submittedJson(ko.toJSON(submittedModel));

			return true;

        }

		public translateArtistRole = (role: string) => {
			return this.artistRoleNames[role];
		};

		public hasValidationErrors: KnockoutComputed<boolean>;
		public showInstrumentalNote: KnockoutComputed<boolean>;
		public validationError_duplicateArtist: KnockoutComputed<boolean>;
		public validationError_needArtist: KnockoutComputed<boolean>;
		public validationError_needOriginal: KnockoutComputed<boolean>;
		public validationError_needProducer: KnockoutComputed<boolean>;
		public validationError_needReferences: KnockoutComputed<boolean>;
		public validationError_needType: KnockoutComputed<boolean>;
		public validationError_nonInstrumentalSongNeedsVocalists: KnockoutComputed<boolean>;
	    public validationError_redundantEvent: KnockoutComputed<boolean>;
		public validationError_unspecifiedNames: KnockoutComputed<boolean>;

		constructor(
			private songRepository: SongRepository,
			private artistRepository: ArtistRepository,
			pvRepository: PVRepository,
			userRepository: UserRepository,
			private urlMapper: UrlMapper,
			private readonly artistRoleNames: { [key: string]: string; },
			webLinkCategories: TranslatedEnumField[],
			data: SongForEditContract,
			canBulkDeletePVs: boolean,
			private dialogService: IDialogService,
			private instrumentalTagId: number,
			public languageNames) {

			this.albumEventId = data.albumEventId;
			this.albumReleaseDate = data.albumReleaseDate ? moment(data.albumReleaseDate) : null;
			this.artistLinks = ko.observableArray(_.map(data.artists, artist => new ArtistForAlbumEditViewModel(null, artist)));
			this.defaultNameLanguage = ko.observable(data.defaultNameLanguage);
			this.deleted = data.deleted;
			this.id = data.id;
			this.length = ko.observable(data.lengthSeconds);
			this.lyrics = new LyricsForSongListEditViewModel(data.lyrics);
			this.names = NamesEditViewModel.fromContracts(data.names);
			this.notes = new EnglishTranslatedStringEditViewModel(data.notes);
			this.originalVersion = new BasicEntryLinkViewModel<SongContract>(data.originalVersion, songRepository.getOne);
			this.publishDate = ko.observable(data.publishDate ? moment(data.publishDate).toDate() : null); // Assume server date is UTC
			this.pvs = new PVListEditViewModel(pvRepository, urlMapper, data.pvs, canBulkDeletePVs, true, true);
			this.releaseEvent = new BasicEntryLinkViewModel<ReleaseEventContract>(data.releaseEvent, null);
			this.songTypeStr = ko.observable(data.songType);
			this.songType = ko.computed(() => SongType[this.songTypeStr()]);
			this.status = ko.observable(data.status);
			this.tags = data.tags;
			this.webLinks = new WebLinksEditViewModel(data.webLinks, webLinkCategories);
			this.hasMaxMilliBpm = ko.observable(data.maxMilliBpm > data.minMilliBpm);
			this.minMilliBpm = ko.observable(data.minMilliBpm);
			this.maxMilliBpm = ko.observable(data.maxMilliBpm > data.minMilliBpm ? data.maxMilliBpm : null);

			this.artistRolesEditViewModel = new AlbumArtistRolesEditViewModel(artistRoleNames);

			this.artistSearchParams = {
				createNewItem: vdb.resources.song.addExtraArtist,
				acceptSelection: this.addArtist,
				height: 300
			};

			this.canHaveOriginalVersion = ko.computed(() => this.songType() !== SongType.Original);

			this.hasAlbums = data.hasAlbums;

			this.originalVersionSearchParams = {
				acceptSelection: this.originalVersion.id,
				extraQueryParams: {
					songTypes: "Unspecified,Original,Remaster,Remix,Cover,Arrangement,Mashup,DramaPV,Other"
				},
				ignoreId: this.id,
				height: 250
			};

			this.lengthFormatted = KnockoutHelper.lengthFormatted(this.length);

			this.showInstrumentalNote = ko.computed(() => {
				return this.pvs.isPossibleInstrumental()
					&& this.songType() !== SongType.Instrumental
					&& !_.some(this.tags, t => t === this.instrumentalTagId);
			});

			this.showLyricsNote = ko.computed(() => this.songType() !== SongType.Instrumental && !this.originalVersion.isEmpty());

			this.validationError_duplicateArtist = ko.computed(() => {
				return _.some(_.groupBy(this.artistLinks(), (a: ArtistForAlbumEditViewModel) => a.artist ? a.artist.id.toString() : a.name()), a => a.length > 1);
			});

			this.validationError_needArtist = ko.computed(() => !_.some(this.artistLinks(), a => a.artist != null));

			this.validationError_needOriginal = ko.computed(() => {
				
				var songType = SongType;
				var derivedTypes = [songType.Remaster, songType.Cover, songType.Instrumental, songType.MusicPV, songType.Other, songType.Remix, songType.Arrangement];
				return (this.notes.original() === null || this.notes.original() === "")
					&& this.originalVersion.entry() == null
					&& _.includes(derivedTypes, this.songType());

			});

			this.validationError_needProducer = ko.computed(() => !this.validationError_needArtist() && !_.some(this.artistLinks(), a => a.artist != null && ArtistHelper.isProducerRole(a.artist, a.rolesArrayTyped(), SongHelper.getContentFocus(this.songType()))));

			this.validationError_needReferences = ko.computed(() =>
				!this.hasAlbums
				&& _.isEmpty(this.notes.original())
				&& _.isEmpty(this.webLinks.items())
				&& _.isEmpty(this.pvs.pvs()));

			this.validationError_needType = ko.computed(() => this.songType() === SongType.Unspecified);

			this.validationError_nonInstrumentalSongNeedsVocalists = ko.computed(() => {

				return (!this.validationError_needArtist()
					&& !SongHelper.isInstrumental(this.songType())
					&& this.songType() !== SongType.Arrangement // Arrangements are considered possible instrumentals in this context
					&& !_.some(this.tags, t => t === this.instrumentalTagId))
					&& !_.some(this.artistLinks(), a => ArtistHelper.isVocalistRole(a.artist, a.rolesArrayTyped()));

			});

			this.validationError_redundantEvent = ko.computed(() => this.albumEventId && !this.releaseEvent.isEmpty() && this.releaseEvent.id() === this.albumEventId);

			this.validationError_unspecifiedNames = ko.computed(() => !this.names.hasPrimaryName());

			this.hasValidationErrors = ko.computed(() =>
				this.validationError_duplicateArtist() ||
				this.validationError_needArtist() ||
				this.validationError_needOriginal() ||
				this.validationError_needProducer() ||
				this.validationError_needReferences() ||
				this.validationError_needType() ||
				this.validationError_nonInstrumentalSongNeedsVocalists() ||
				this.validationError_redundantEvent() ||
				this.validationError_unspecifiedNames()
			);
		
			this.eventDate = ko.computed(() => (this.releaseEvent.entry() && this.releaseEvent.entry().date ? moment(this.releaseEvent.entry().date) : null));

			this.firstPvDate = ko.computed(() => {

				var val = _.chain(this.pvs.pvs())
					.filter(pv => pv.publishDate && pv.pvType === PVType[PVType.Original])
					.map(pv => moment(pv.publishDate))
					.sortBy(p => p)
					.head<_.LoDashExplicitObjectWrapper<moment.Moment>>() 
					.value();

				return val;

			});

			this.suggestedPublishDate = ko.computed(() => _
				.chain([
					{ date: this.albumReleaseDate, source: 'Album' },
					{ date: this.firstPvDate(), source: 'PV' }
				])
				.filter(d => d.date != null)
				.sortBy(d => d.date)
				.head<_.LoDashExplicitObjectWrapper<PotentialDate>>()
				.value());

			this.minBpm = KnockoutHelper.bpm(this.minMilliBpm);

			this.maxBpm = KnockoutHelper.bpm(this.maxMilliBpm);

			window.setInterval(() => userRepository.refreshEntryEdit(EntryType.Song, data.id), 10000);

        }

	}

	export interface PotentialDate {
		date: moment.Moment;
		source: string;
	}