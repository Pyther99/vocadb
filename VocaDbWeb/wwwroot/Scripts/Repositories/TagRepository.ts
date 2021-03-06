import AjaxHelper from '../Helpers/AjaxHelper';
import BaseRepository from './BaseRepository';
import { CommonQueryParams } from './BaseRepository';
import ContentLanguagePreference from '../Models/Globalization/ContentLanguagePreference';
import EntryCommentRepository from './EntryCommentRepository';
import EntryTagMappingContract from '../DataContracts/Tag/EntryTagMappingContract';
import EntryType from '../Models/EntryType';
import functions from '../Shared/GlobalFunctions';
import NameMatchMode from '../Models/NameMatchMode';
import PagingProperties from '../DataContracts/PagingPropertiesContract';
import PartialFindResultContract from '../DataContracts/PartialFindResultContract';
import TagApiContract from '../DataContracts/Tag/TagApiContract';
import TagBaseContract from '../DataContracts/Tag/TagBaseContract';
import TagMappingContract from '../DataContracts/Tag/TagMappingContract';
import UrlMapper from '../Shared/UrlMapper';

	export default class TagRepository extends BaseRepository {

		private readonly urlMapper: UrlMapper;

		constructor(baseUrl: string, lang?: ContentLanguagePreference) {
			super(baseUrl, lang);
			this.urlMapper = new UrlMapper(baseUrl);
		}

		public create = (name: string, callback?: (result: TagBaseContract) => void) => {
			var url = functions.mergeUrls(this.baseUrl, "/api/tags?name=" + name);
			$.postJSON(url, callback);
		}

		public createReport = (tagId: number, reportType: string, notes: string, versionNumber: number, callback?: () => void) => {

			var url = functions.mergeUrls(this.baseUrl, "/api/tags/" + tagId + "/reports?" + AjaxHelper.createUrl({ reportType: [reportType], notes: [notes], versionNumber: [versionNumber] }));
			$.postJSON(url, callback);

		}

		public getById = (id: number, fields: string, lang: string, callback?: (result: TagApiContract) => void) => {
			var url = functions.mergeUrls(this.baseUrl, "/api/tags/" + id);
			$.getJSON(url, { fields: fields || undefined, lang: lang }, callback);
		}

		public getComments = () => new EntryCommentRepository(new UrlMapper(this.baseUrl), "/tags/");

		public getEntryTypeTag = (entryType: EntryType, subType: string = "") => {
			var url = functions.mergeUrls(this.baseUrl, "/api/entry-types/" + EntryType[entryType] + "/" + subType + "/tag");
			return this.getJsonPromise<TagApiContract>(url, { fields: "Description", lang: this.languagePreferenceStr });
		}

		public getList = (queryParams: TagQueryParams,
			callback?: (result: PartialFindResultContract<TagApiContract>) => void) => {

			var nameMatchMode = queryParams.nameMatchMode || NameMatchMode.Auto;

			var url = functions.mergeUrls(this.baseUrl, "/api/tags");
			var data = {
				start: queryParams.start, getTotalCount: queryParams.getTotalCount, maxResults: queryParams.maxResults,
				query: queryParams.query,
				fields: queryParams.fields || undefined,
				nameMatchMode: NameMatchMode[nameMatchMode],
				allowAliases: queryParams.allowAliases,
				categoryName: queryParams.categoryName,
				lang: queryParams.lang,
				sort: queryParams.sort
			};

			$.getJSON(url, data, callback);

		}

		public getEntryTagMappings = (): Promise<EntryTagMappingContract[]> => {
			return this.getJsonPromise(this.urlMapper.mapRelative("/api/tags/entry-type-mappings"));
		}

		public getMappings = (paging: PagingProperties): Promise<PartialFindResultContract<TagMappingContract>> => {
			return this.getJsonPromise(this.urlMapper.mapRelative("/api/tags/mappings"), paging);
		}

		public getTopTags = (lang: string, categoryName?: string, entryType?: EntryType, callback?: (tags: TagBaseContract[]) => void) => {
			
			var url = functions.mergeUrls(this.baseUrl, "/api/tags/top");
			var data = { lang: lang, categoryName: categoryName, entryType: entryType || undefined };

			$.getJSON(url, data, callback);

		}

		public saveEntryMappings = (mappings: EntryTagMappingContract[]): Promise<any> => {
			var url = this.urlMapper.mapRelative("/api/tags/entry-type-mappings");
			return Promise.resolve(AjaxHelper.putJSON(url, mappings));
		}

		public saveMappings = (mappings: TagMappingContract[]): Promise<any> => {
			var url = this.urlMapper.mapRelative("/api/tags/mappings");
			return Promise.resolve(AjaxHelper.putJSON(url, mappings));
		}

	}

	export interface TagQueryParams extends CommonQueryParams {
		
		allowAliases?: boolean;

		categoryName?: string;

		// Comma-separated list of optional fields
		fields?: string;

		sort?: string;

	}