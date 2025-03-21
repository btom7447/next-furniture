import { LayoutGrid, LayoutList, SlidersHorizontal } from 'lucide-react';
import React from 'react';

interface CatalogFilterProps {
  products: string[];
  onShowChange: (value: number) => void;
  onLayoutChange: (layout: 'grid' | 'list') => void;
  currentLayout: 'grid' | 'list';
  visibleProducts: number; // Track number of visible products
}

const CatalogFilter: React.FC<CatalogFilterProps> = ({
  products,
  onShowChange,
  onLayoutChange,
  currentLayout,
  visibleProducts,
}) => {
  const handleShowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      onShowChange(Math.min(value, products.length)); // Prevent exceeding total products
    }
  };

  return (
    <section className="mt-10 p-10 bg-[#fff4f4] flex flex-col md:flex-row justify-between items-center gap-x-20 gap-y-10">
      <div className="flex items-center space-x-7">
        <button type="button" className="flex items-center gap-3 text-black text-xl">
          <SlidersHorizontal size={25} />
          Filter
        </button>
        <button
          type="button"
          className={`cursor-pointer ${currentLayout === 'grid' ? 'text-black' : 'text-gray-500'}`}
          onClick={() => onLayoutChange('grid')}
        >
          <LayoutGrid size={25} />
        </button>
        <button
          type="button"
          className={`cursor-pointer ${currentLayout === 'list' ? 'text-black' : 'text-gray-500'}`}
          onClick={() => onLayoutChange('list')}
        >
          <LayoutList size={25} />
        </button>
        <div className="flex pl-7 border-gray-500 border-l-1">
          <h6 className="text-black text-xl">
            Showing 1-{Math.min(visibleProducts, products.length)} of {products.length} results
          </h6>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <h5 className="text-black text-xl">Show</h5>
        <input
          type="number"
          name="show"
          id="show"
          value={visibleProducts} // Reflect the current state
          className="bg-white w-25 p-3 text-gray-700 text-xl"
          onChange={handleShowChange}
        />
        <h5 className="text-black text-xl">Sort by</h5>
        <input
          type="text"
          name="sort"
          id="sort"
          value={currentLayout === 'grid' ? 'Grid' : 'List'}
          readOnly
          className="bg-white max-w-[80px] p-3 text-gray-700 text-xl"
        />
      </div>
    </section>
  );
};

export default CatalogFilter;