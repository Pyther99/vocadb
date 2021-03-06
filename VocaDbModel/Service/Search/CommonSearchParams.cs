#nullable disable

using VocaDb.Model.Domain;

namespace VocaDb.Model.Service.Search
{
	/// <summary>
	/// Common search parameters for all entry types.
	/// </summary>
	public class CommonSearchParams : CommonSearchParams<SearchTextQuery>
	{
		public static CommonSearchParams<TTextQuery> Create<TTextQuery>(TTextQuery textQuery, bool onlyByName, bool moveExactToTop) where TTextQuery : SearchTextQuery, new()
		{
			return new CommonSearchParams<TTextQuery>(textQuery, onlyByName, moveExactToTop);
		}

		public CommonSearchParams() { }

		public CommonSearchParams(SearchTextQuery textQuery, bool onlyByName, bool moveExactToTop)
			: base(textQuery, onlyByName, moveExactToTop) { }
	}

	/// <summary>
	/// Common search parameters for all entry types.
	/// </summary>
	public class CommonSearchParams<TTextQuery> where TTextQuery : SearchTextQuery, new()
	{
		public CommonSearchParams()
		{
			TextQuery = new TTextQuery();
		}

		public CommonSearchParams(TTextQuery textQuery, bool onlyByName, bool moveExactToTop)
			: this()
		{
			TextQuery = textQuery;
			OnlyByName = onlyByName;
			MoveExactToTop = moveExactToTop;
		}

		public EntryStatus? EntryStatus { get; set; }

		/// <summary>
		/// Moves results that are exact matches or starting with the search term to top of the result set.
		/// This parameter is mostly used for autocompletes and is not intended to work with paging.
		/// </summary>
		public bool MoveExactToTop { get; set; }

		public NameMatchMode NameMatchMode => TextQuery.MatchMode;

		public bool OnlyByName { get; set; }

		public string Query => TextQuery.Query;

		public TTextQuery TextQuery { get; set; }
	}
}
