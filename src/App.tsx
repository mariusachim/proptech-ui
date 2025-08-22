import { useState } from 'react'
import './App.css'

// Define the Property type
interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  imageUrl: string;
}

// Sample property data
const sampleProperties: Property[] = [
  {
    id: 1,
    title: "Modern Family Home",
    address: "123 Main St, Anytown, USA",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    description: "Beautiful modern home with spacious rooms and a large backyard. Perfect for families.",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Downtown Apartment",
    address: "456 Park Ave, Anytown, USA",
    price: 320000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description: "Stylish apartment in the heart of downtown. Close to restaurants, shops, and public transportation.",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Suburban Ranch",
    address: "789 Oak Dr, Anytown, USA",
    price: 380000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    description: "Charming ranch-style home in a quiet suburban neighborhood. Features a renovated kitchen and large deck.",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

// PropertyCard component to display individual property
const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.imageUrl} alt={property.title} />
      </div>
      <div className="property-details">
        <h3>{property.title}</h3>
        <p className="property-address">{property.address}</p>
        <p className="property-price">${property.price.toLocaleString()}</p>
        <div className="property-features">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.area} sqft</span>
        </div>
        <p className="property-description">{property.description}</p>
        <button className="contact-button">Contact Agent</button>
      </div>
    </div>
  );
};

// PropertyList component to display multiple properties
const PropertyList = ({ properties }: { properties: Property[] }) => {
  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

function App() {
  const [properties] = useState<Property[]>(sampleProperties);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Real Estate Listings</h1>
        <p>Find your dream home today</p>
      </header>

      <main>
        <section className="featured-properties">
          <h2>Featured Properties</h2>
          <PropertyList properties={properties} />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2023 Real Estate Listings. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
