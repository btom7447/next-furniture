import BreadCrumb from '@/components/BreadCrumb';
import { getAllProducts } from '@/lib/airtable';
import ProductCatalog from '@/components/ProductCatalog';

const Shop = async () => {
  const products = await getAllProducts();

  return (
    <>
      <BreadCrumb title="Shop" />
      <ProductCatalog products={products} /> 
    </>
  );
};

export default Shop;
