import ArtistContract from "../DataContracts/Artist/ArtistContract";
import ContentLanguagePreference from "../Models/Globalization/ContentLanguagePreference";
import functions from "../Shared/GlobalFunctions";
import { initEntrySearch } from "../Shared/EntryAutoComplete";

export function initPage() {

	function acceptArtistSelection(artistId, term) {

		if (!functions.isNullOrWhiteSpace(artistId)) {
			$.post("../../User/OwnedArtistForUserEditRow", { artistId: artistId }, artistAdded);
		}

	}

	function artistAdded(row) {

		var artistsTable = $("#ownedArtistsTableBody");
		artistsTable.append(row);

	}

	$("#clearRatingsLink").button();

	var artistAddName = $("input#ownedArtistAddName")[0];

	initEntrySearch(artistAddName, "../../api/artists",
		{
			acceptSelection: acceptArtistSelection,
			createOptionFirstRow: (item: ArtistContract) => (item.name + " (" + item.artistType + ")"),
			createOptionSecondRow: (item: ArtistContract) => (item.additionalNames),
			extraQueryParams: { nameMatchMode: 'Auto', lang: ContentLanguagePreference[vdb.values.languagePreference], fields: 'AdditionalNames' },
			termParamName: 'query'
		});

	$(document).on("click", "a.artistRemove", function () {

		$(this).parent().parent().remove();
		return false;

	});

}