import Airtable from 'airtable';

// Initialize Airtable with custom configuration
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY, 
});

// Initialize the base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID as string);

// Define the type for the product data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; 
  gallery: string[];
  reviews: number;
  reviewers: number;
  sku: string;
  category: string;
  tags: string[];
}

// Fetch product details by ID
export async function getProductDetails(id: string): Promise<Product | null> {
  try {
    const record = await base("Products").find(id);

    if (!record) {
      return null;
    }

    const gallery = record.fields.image && Array.isArray(record.fields.image)
        ? record.fields.image.map((img: any) => img.url)
      : [];

    // Ensure tags is an array of strings
    const tags =
      record.fields.tags && Array.isArray(record.fields.tags)
        ? record.fields.tags
        : [];

    const product: Product = {
      id: record.id, // Airtable's record ID
      name: record.fields.name as string,
      description: record.fields.description as string,
      price: record.fields.price as number,
      image: gallery[0] || "", 
      gallery: gallery,
      reviews: record.fields.reviews as number,
      reviewers: record.fields.reviewers as number,
      sku: record.fields.sku as string,
      category: record.fields.category as string,
      tags: tags,
    };

    return product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

// Fetch all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const records = await base('Products').select().all();

    return records.map((record) => {
      const gallery =
        record.fields.image && Array.isArray(record.fields.image)
          ? record.fields.image.map((img: any) => img.url) 
          : [];

      // Ensure tags is an array of strings
      const tags =
      record.fields.tags && Array.isArray(record.fields.tags)
        ? record.fields.tags
        : [];

      return {
        id: record.id,
        name: record.fields.name as string,
        description: record.fields.description as string,
        price: record.fields.price as number,
        image: gallery[0] || "", 
        gallery: gallery,
        reviews: record.fields.reviews as number,
        reviewers: record.fields.reviewers as number,
        sku: record.fields.sku as string,
        category: record.fields.category as string,
        tags: tags,
      };
    });
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}