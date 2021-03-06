import BasicEntryLinkViewModel from '../BasicEntryLinkViewModel';
import PagedItemsViewModel from '../PagedItemsViewModel';
import UserApiContract from '../../DataContracts/User/UserApiContract';
import { UserInboxType } from '../../Repositories/UserRepository';
import UserMessageSummaryContract from '../../DataContracts/User/UserMessageSummaryContract';
import UserRepository from '../../Repositories/UserRepository';

	export default class UserMessagesViewModel {

		constructor(
			private readonly userRepository: UserRepository,
			private readonly userId: number,
			inboxType: UserInboxType,
			selectedMessageId?: number,
			receiverName?: string) {

            this.notifications = new UserMessageFolderViewModel(userRepository, UserInboxType.Notifications, userId, inboxType !== UserInboxType.Notifications);
            this.receivedMessages = new UserMessageFolderViewModel(userRepository, UserInboxType.Received, userId, inboxType !== UserInboxType.Received);
            this.sentMessages = new UserMessageFolderViewModel(userRepository, UserInboxType.Sent, userId, false);

			this.inboxes = [this.receivedMessages, this.notifications, this.sentMessages];

			var inbox = _.find(this.inboxes, i => i.inbox === inboxType);

			inbox.init(() => {
				if (selectedMessageId != null) {
					this.selectMessageById(selectedMessageId, inbox);
				}
			});

			if (receiverName) {
				userRepository.getOneByName(receiverName, result => this.newMessageViewModel.receiver.entry(result));
			}

        }

		private getInboxTabName = (inbox: UserInboxType) => {
			
			switch (inbox) {
				case UserInboxType.Received:
					return "#receivedTab";
				case UserInboxType.Notifications:
					return "#notificationsTab";
				case UserInboxType.Sent:
					return "#sentTab";
			}

			return null;

		}

		private inboxes: UserMessageFolderViewModel[];

		public messageSent: () => void = null;

		newMessageViewModel = new NewMessageViewModel();

        notifications: UserMessageFolderViewModel;

        receivedMessages: UserMessageFolderViewModel;

        sentMessages: UserMessageFolderViewModel;

		reply = () => {

			if (!this.selectedMessage())
				throw Error("No message selected");

			var msg = this.selectedMessage();
			this.newMessageViewModel.receiver.entry(msg.sender);
			this.newMessageViewModel.subject(msg.subject && msg.subject.indexOf("Re:") === 0 ? msg.subject : "Re: " + msg.subject);

            this.selectTab("#composeTab");

		};

        selectedMessage = ko.observable<UserMessageViewModel>();

        selectedMessageBody: KnockoutObservable<string> = ko.observable("");

        selectMessageById = (messageId: number, inbox: UserMessageFolderViewModel) => {

            var message = _.find(inbox.items(), msg => msg.id === messageId);

            if (message) {
                this.selectInbox(inbox.inbox);
                this.selectMessage(message);
            }

        };

		selectMessage = (message: UserMessageViewModel) => {

            this.userRepository.getMessage(message.id, message => {
                this.selectedMessageBody(message.body);
            });

            this.receivedMessages.selectMessage(message);
            this.sentMessages.selectMessage(message);
            this.notifications.selectMessage(message);

            message.selected(true);
            message.read(true);
			this.selectedMessage(message);

        };

		private selectInbox = (inbox: UserInboxType) => {
			this.selectTab(this.getInboxTabName(inbox));
		}

        selectTab = (tabName: string) => {
            var index = $('#tabs > ul > li > a').index($(tabName));
            $("#tabs").tabs("option", "active", index);
		};

		public sendMessage = () => {

			if (this.newMessageViewModel.receiver.isEmpty()) {
				this.newMessageViewModel.isReceiverInvalid(true);
				return;
			}

			this.newMessageViewModel.isSending(true);
			var message = this.newMessageViewModel.toContract(this.userId);
			this.userRepository.createMessage(this.userId, message, () => {
				this.newMessageViewModel.clear();
				this.sentMessages.clear();
				this.selectInbox(UserInboxType.Sent);
				if (this.messageSent)
					this.messageSent();
			}).always(() => this.newMessageViewModel.isSending(false));

		}

    }

    export class UserMessageFolderViewModel extends PagedItemsViewModel<UserMessageViewModel> {

		constructor(
			private readonly userRepo: UserRepository,
			public readonly inbox: UserInboxType,
			private readonly userId,
			getMessageCount: boolean) {

			super();
            
            this.unread = ko.computed(() => {
				return this.items().length ? _.size(_.filter(this.items(), msg => !msg.read())) : this.unreadOnServer();
            });

			if (getMessageCount) {
				this.userRepo.getMessageSummaries(userId, inbox, { start: 0, maxEntries: 0, getTotalCount: true }, true, null, null,
					result => this.unreadOnServer(result.totalCount));
			}

			this.selectAll.subscribe(selected => {
				_.forEach(this.items(), m => m.checked(selected));
			});

			this.anotherUser = new BasicEntryLinkViewModel<UserApiContract>(null, null);
			this.anotherUser.id.subscribe(this.clear);

		}

		public anotherUser: BasicEntryLinkViewModel<UserApiContract>;

		public canFilterByUser = () => this.inbox === UserInboxType.Received || this.inbox === UserInboxType.Sent;

        private deleteMessage = (message: UserMessageViewModel) => {

			this.userRepo.deleteMessage(message.id);
            this.items.remove(message);

        };

		public deleteSelected = () => {

			var selected = _.chain(this.items()).filter(m => m.checked());
			var selectedIds = selected.map(m => m.id).value();

			if (selectedIds.length === 0)
				return;

			this.userRepo.deleteMessages(this.userId, selectedIds);
            this.items.removeAll(selected.value());

		}

		public loadMoreItems = (callback) => {
			this.userRepo.getMessageSummaries(this.userId, this.inbox, { start: this.start, maxEntries: 100, getTotalCount: true }, false, this.anotherUser.id(), 40, (result) => {
				var messageViewModels = _.map(result.items, msg => new UserMessageViewModel(msg));
				callback({ items: messageViewModels, totalCount: result.totalCount });
			});
		}

		selectAll = ko.observable(false);

        selectMessage = (message: UserMessageViewModel) => {

            _.each(this.items(), msg => {
                if (msg != message)
                    msg.selected(false);
            });

        };

        unread: KnockoutComputed<number>;

		private unreadOnServer = ko.observable(null);

    }

	export class UserMessageViewModel {

		constructor(data: UserMessageSummaryContract) {
            this.created = data.createdFormatted;
            this.highPriority = data.highPriority;
			this.id = data.id;
			this.inbox = data.inbox;
            this.read = ko.observable(data.read);
            this.receiver = data.receiver;
			this.sender = data.sender;
			this.subject = data.subject;
		}

		checked = ko.observable(false);

		created: string;

        highPriority: boolean;

		id: number;

		inbox: string;

        read: KnockoutObservable<boolean>;

        receiver: UserApiContract;

		selected = ko.observable(false);

		sender: UserApiContract;

		subject: string;

	}

	export class NewMessageViewModel {

		constructor() {
			this.receiver.id.subscribe(() => this.isReceiverInvalid(false));
		}

		body = ko.observable<string>("");

		highPriority = ko.observable(false);

		isReceiverInvalid = ko.observable(false);

		isSending = ko.observable(false);

		receiver = new BasicEntryLinkViewModel<UserApiContract>();

		subject = ko.observable<string>("");

		public clear = () => {
			this.body("");
			this.highPriority(false);
			this.receiver.clear();
			this.subject("");
		}

		public toContract = (senderId: number) => {
			return {
				body: this.body(),
				highPriority: this.highPriority(),
				receiver: this.receiver.entry(),
				sender: { id: senderId } as UserApiContract,
				subject: this.subject(),
				id: null
			} as UserApiContract;
		};

	}