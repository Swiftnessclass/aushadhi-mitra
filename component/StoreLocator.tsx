"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

type Store = {
  _id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function StoreLocator() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    fetch("/api/stores")
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setUserCoords(coords);
      });
    }
  }, []);

  useEffect(() => {
    if (userCoords && stores.length > 0) {
      const nearStores = stores.filter((store) => {
        const dist = getDistanceFromLatLonInKm(
          userCoords[0],
          userCoords[1],
          store.latitude,
          store.longitude
        );
        return dist <= 10; // filter within 10 km radius
      });
      setFilteredStores(nearStores);
    }
  }, [userCoords, stores]);

  return (
    <div className="h-[500px] w-full">
      <h2 className="text-lg font-medium mb-2">
        Showing stores within 10 km radius
      </h2>
      <MapContainer
        center={userCoords ?? [20.5937, 78.9629]}
        zoom={userCoords ? 12 : 5}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredStores.map((store) => (
          <Marker
            key={store._id}
            position={[store.latitude, store.longitude]}
          >
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.address}
            </Popup>
          </Marker>
        ))}
        {userCoords && (
          <Marker position={userCoords}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
