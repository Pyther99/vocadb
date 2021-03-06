import ContentLanguagePreference from "../../Models/Globalization/ContentLanguagePreference";
import { EntryAutoCompleteParams } from "../../Shared/EntryAutoComplete";
import functions from '../../Shared/GlobalFunctions';
import { initEntrySearch } from '../../Shared/EntryAutoComplete';
import VenueForApiContract from "../../DataContracts/Venue/VenueForApiContract";

declare global {
	interface KnockoutBindingHandlers {
		venueAutoComplete: KnockoutBindingHandler;
	}
}

// Venue autocomplete search box.
ko.bindingHandlers.venueAutoComplete = {
	init: (element: HTMLElement, valueAccessor: () => KnockoutObservable<VenueForApiContract>, allBindingsAccessor: () => any) => {

		var queryParams = {
			nameMatchMode: 'Auto',
			lang: ContentLanguagePreference[vdb.values.languagePreference],
			preferAccurateMatches: true,
			maxResults: 20,
			sort: 'Name'
		};

		const params: EntryAutoCompleteParams<VenueForApiContract> = {
			acceptSelection: (id, term, itemType, item) => {
				valueAccessor()(item);
			},
			createNewItem: null,
			createOptionFirstRow: (item) => item.name,
			extraQueryParams: queryParams,
			termParamName: 'query',
			singleRow: true
		};

		initEntrySearch(element, functions.mapAbsoluteUrl("/api/venues"), params);

	}
}