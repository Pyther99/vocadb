/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../Shared/GlobalFunctions.ts" />

module vdb.viewModels {

	import cls = vdb.models;
	import dc = dataContracts;
	import rep = repositories;

    export class AlbumDetailsViewModel {

		public comments: EditableCommentsViewModel;

        public downloadTagsDialog: DownloadTagsViewModel;

		private id: number;

		public showTranslatedDescription: KnockoutObservable<boolean>;

		public tagsEditViewModel: tags.TagsEditViewModel;

		public tagUsages: tags.TagListViewModel;

		private tagsUpdated = (usages: dc.tags.TagUsageForApiContract[]) => {

			this.tagUsages.tagUsages(usages);

		}

        public usersContent = ko.observable<string>();

        public getUsers = () => {

            $.post(vdb.functions.mapAbsoluteUrl("/Album/UsersWithAlbumInCollection"), { albumId: this.id }, result => {

                this.usersContent(result);
                $("#userCollectionsPopup").dialog("open");

            });

            return false;

        };

        constructor(
			repo: rep.AlbumRepository,
			userRepo: rep.UserRepository,
			data: AlbumDetailsAjax,
			loggedUserId: number,
			canDeleteAllComments: boolean,
			formatString: string,
			showTranslatedDescription: boolean) {

			this.id = data.id;
            this.downloadTagsDialog = new DownloadTagsViewModel(this.id, formatString);
			this.showTranslatedDescription = ko.observable(showTranslatedDescription);
			this.comments = new EditableCommentsViewModel(repo, this.id, loggedUserId, canDeleteAllComments, canDeleteAllComments, false);

			this.tagsEditViewModel = new tags.TagsEditViewModel({
				getTagSelections: callback => userRepo.getAlbumTagSelections(this.id, callback),
				saveTagSelections: tags => userRepo.updateAlbumTags(this.id, tags, this.tagsUpdated)
			});

			this.tagUsages = new tags.TagListViewModel(data.tagUsages);

        }

    }

    export interface AlbumDetailsAjax {

        id: number;

		tagUsages: dc.tags.TagUsageForApiContract[];

    }

    export class DownloadTagsViewModel {

        public dialogVisible = ko.observable(false);

        public downloadTags = () => {

            this.dialogVisible(false);

            var url = "/Album/DownloadTags/" + this.albumId;
            window.location.href = url + "?setFormatString=true&formatString=" + encodeURIComponent(this.formatString());

        };

        public formatString: KnockoutObservable<string>;

        public dialogButtons = ko.observableArray([
            { text: vdb.resources.albumDetails.download, click: this.downloadTags },
        ]);

        public show = () => {

            this.dialogVisible(true);

        };

        constructor(private albumId: number, formatString: string) {
            this.formatString = ko.observable(formatString)
        }

    }

}