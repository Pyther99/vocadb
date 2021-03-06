import { parseSongVoteRating } from '../Models/SongVoteRating';
import SongVoteRating from '../Models/SongVoteRating';
import UserRepository from '../Repositories/UserRepository';

    // Knockout view model for PV rating buttons
    export default class PVRatingButtonsViewModel {

        public isRated: KnockoutComputed<boolean>;

        public isRatingFavorite: KnockoutComputed<boolean>;

        public isRatingLike: KnockoutComputed<boolean>;

		public rating: KnockoutObservable<SongVoteRating>;

		// Rating operation is in progress. Prevents racing conditions.
		public ratingInProgress = ko.observable(false);

		private setRating: (rating: SongVoteRating) => void;
		public setRating_favorite = () => this.setRating(SongVoteRating.Favorite);
		public setRating_like = () => this.setRating(SongVoteRating.Like);
		public setRating_nothing = () => this.setRating(SongVoteRating.Nothing);

		constructor(repository: UserRepository, songWithVoteContract: SongWithVoteContract, ratingCallback: () => void,
			isLoggedIn = true) {

            var songId = songWithVoteContract.id;
            this.rating = ko.observable(parseSongVoteRating(songWithVoteContract.vote));
            this.isRated = ko.computed(() => this.rating() !== SongVoteRating.Nothing);
            this.isRatingFavorite = ko.computed(() => this.rating() === SongVoteRating.Favorite);
            this.isRatingLike = ko.computed(() => this.rating() === SongVoteRating.Like);

			this.setRating = (rating: SongVoteRating) => {

				if (this.ratingInProgress() || !isLoggedIn)
					return;

				this.ratingInProgress(true);
				this.rating(rating);

                repository.updateSongRating(songId, rating, () => {
                    if (rating !== SongVoteRating.Nothing && ratingCallback)
						ratingCallback();
				}).always(() => this.ratingInProgress(false));

            }

        }

    }

    export interface SongWithVoteContract {
        
        id: number;

        vote: string;
    
    }