import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { place, coords, radius = 1000, includeHospitals = true } = await req.json();

  const headers = { "User-Agent": "AushadhiMitra/1.0" };
  let lat: string | number = "";
  let lon: string | number = "";

  try {
    // Use coords if provided
    if (coords && coords.lat && coords.lon) {
      lat = coords.lat;
      lon = coords.lon;
    } else if (place) {
      // Otherwise, use Nominatim to get coordinates from place name
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        place
      )}&format=json&limit=1&addressdetails=1`;

      const geoRes = await fetch(nominatimUrl, { headers });
      const geoData = await geoRes.json();

      if (!geoData?.[0]) {
        return NextResponse.json({ error: "Location not found" }, { status: 404 });
      }

      lat = geoData[0].lat;
      lon = geoData[0].lon;
    } else {
      return NextResponse.json({ error: "No location input provided" }, { status: 400 });
    }

    // Build Overpass API query
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
        ${includeHospitals ? `
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        node["amenity"="clinic"](around:${radius},${lat},${lon});` : ""}
      );
      out body;
    `;

    const overpassRes = await fetch("http://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    });

    const overpassData = await overpassRes.json();

    return NextResponse.json({ results: overpassData.elements });
  } catch (error) {
    console.error("Error fetching pharmacy data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
