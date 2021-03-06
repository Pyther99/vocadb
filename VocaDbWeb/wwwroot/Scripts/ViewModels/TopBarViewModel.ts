import EntryReportRepository from '../Repositories/EntryReportRepository';
import PartialFindResultContract from '../DataContracts/PartialFindResultContract';
import UserMessageSummaryContract from '../DataContracts/User/UserMessageSummaryContract';
import UserRepository from '../Repositories/UserRepository';

    // View model for the top bar.
    export default class TopBarViewModel {

        public ensureMessagesLoaded = () => {

            if (this.isLoaded())
                return;

            this.userRepository.getMessageSummaries(null, null, { maxEntries: 3, start: 0, getTotalCount: false }, true, null, 40,
				(messages: PartialFindResultContract<UserMessageSummaryContract>) => {

                this.unreadMessages(messages.items);
                this.isLoaded(true);

            });

        };

        public entryType: KnockoutObservable<string>;

        public hasNotifications: KnockoutComputed<boolean>;

        public isLoaded = ko.observable(false);

        public reportCount = ko.observable(0);

        public searchTerm: KnockoutObservable<string>;

        public entryTypeName: KnockoutComputed<string>;

        public unreadMessages = ko.observableArray<UserMessageSummaryContract>();

        public unreadMessagesCount: KnockoutObservable<number>;

        // Initializes view model
        // entryTypeTranslations: translations for entry types.
        // entryType: currently selected entry type (for search).
        // unreadMessagesCount: number of unread received messages (includes notifications).
        // getNewReportsCount: whether to load new reports count (for mods only).
        // entryReportRepository: entry reports repository.
        // userRepository: user repository.
        constructor(entryTypeTranslations, entryType: string, searchTerm: string, unreadMessagesCount: number,
            getNewReportsCount: boolean, entryReportRepository: EntryReportRepository, private userRepository: UserRepository) {
            
            this.entryType = ko.observable(entryType);
            this.searchTerm = ko.observable(searchTerm);
            this.unreadMessagesCount = ko.observable(unreadMessagesCount);

            this.entryTypeName = ko.computed(() => {
                return <string>entryTypeTranslations[this.entryType()];
            });

            this.hasNotifications = ko.computed(() => {
                return (this.reportCount() > 0);
            });

            if (getNewReportsCount) {
                entryReportRepository.getNewReportCount(count => {
                    this.reportCount(count);
                });
            }
        
        }

    }