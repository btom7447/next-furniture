import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID as string);

export interface Product {
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

// Fix: Ensure `id` is always provided when calling this function
export async function getProductDetails(id: string): Promise<Product | null> {
  if (!id) return null; 

  try {
    const record = await base("Products").find(id);
    if (!record) return null;

    // Append timestamp to avoid expired URLs
    const gallery = Array.isArray(record.fields.image)
      ? record.fields.image.map((img: { url: string }) => `${img.url}?timestamp=${Date.now()}`)
      : [];

    return {
      id: record.id,
      name: record.fields.name as string,
      description: record.fields.description as string,
      price: record.fields.price as number,
      image: gallery.length > 0 ? gallery[0] : "/fallback-image.jpg", // Use fallback
      gallery,
      reviews: record.fields.reviews as number,
      reviewers: record.fields.reviewers as number,
      sku: record.fields.sku as string,
      category: record.fields.category as string,
      tags: Array.isArray(record.fields.tags) ? record.fields.tags : [],
    };
  } catch (err) {
    console.error("Error fetching product details:", err);
    return null;
  }
}


export async function getAllProducts(): Promise<Product[]> {
  try {
    const records = await base("Products").select().all();

    return records.map((record) => {
      const gallery = Array.isArray(record.fields.image)
        ? record.fields.image.map((img: { url: string }) => `${img.url}?timestamp=${Date.now()}`
        )
        : [];

      return {
        id: record.id,
        name: record.fields.name as string,
        description: record.fields.description as string,
        price: record.fields.price as number,
        image: gallery.length > 0 ? gallery[0] : "/fallback-image.jpg",
        gallery,
        reviews: record.fields.reviews as number,
        reviewers: record.fields.reviewers as number,
        sku: record.fields.sku as string,
        category: record.fields.category as string,
        tags: Array.isArray(record.fields.tags) ? record.fields.tags : [],
      };
    });
  } catch (err) {
    console.error("Error fetching all products:", err);
    return [];
  }
}
