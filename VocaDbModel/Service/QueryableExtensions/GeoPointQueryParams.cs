#nullable disable

namespace VocaDb.Model.Service.QueryableExtensions
{
	public enum DistanceUnit { Kilometers, Miles }

	public class GeoPointQueryParams
	{
		public static readonly GeoPointQueryParams Empty = new();

		public double? Latitude { get; set; }

		public double? Longitude { get; set; }

		public GeoPointQueryParams() { }

		public GeoPointQueryParams(double? latitude, double? longitude) => (Latitude, Longitude) = (latitude, longitude);

		public bool HasValue => Latitude.HasValue && Longitude.HasValue;
	}
}
