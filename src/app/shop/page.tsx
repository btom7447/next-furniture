import BreadCrumb from '@/components/BreadCrumb';
import { getAllProducts } from '@/lib/airtable';
import ShopClient from '@/components/ShopClient';
import TrustBadge from '@/components/TrustBadge';

export default async function Shop() {
  const products = await getAllProducts();

  return (
    <>
      <BreadCrumb title="Shop" />
      <ShopClient products={products} />
      <TrustBadge />
    </>
  );
}
