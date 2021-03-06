import AlbumRepository from '../../Repositories/AlbumRepository';
import { ArtistAutoCompleteParams } from '../../KnockoutExtensions/AutoCompleteParams';
import ArtistContract from '../../DataContracts/Artist/ArtistContract';
import ArtistRepository from '../../Repositories/ArtistRepository';
import DuplicateEntryResultContract from '../../DataContracts/DuplicateEntryResultContract';

    export default class AlbumCreateViewModel {

		constructor(private albumRepo: AlbumRepository, private artistRepo: ArtistRepository) {
			
		}

		private addArtist = (artistId: number) => {

			if (artistId) {
				this.artistRepo.getOne(artistId, artist => this.artists.push(artist));
			}

		};

		public artists = ko.observableArray<ArtistContract>([]);

		public artistSearchParams: ArtistAutoCompleteParams = {
			acceptSelection: this.addArtist
		};

		public checkDuplicates = () => {

			var term1 = this.nameOriginal();
			var term2 = this.nameRomaji();
			var term3 = this.nameEnglish();

			this.albumRepo.findDuplicate({ term1: term1, term2: term2, term3: term3 }, result => {

				this.dupeEntries(result);

			});

		};

		public dupeEntries = ko.observableArray<DuplicateEntryResultContract>([]);

		public nameOriginal = ko.observable("");
		public nameRomaji = ko.observable("");
		public nameEnglish = ko.observable("");

		public removeArtist = (artist: ArtistContract) => {
			this.artists.remove(artist);
		};

        public submit = () => {
            this.submitting(true);
            return true;
        }

        public submitting = ko.observable(false);

    }