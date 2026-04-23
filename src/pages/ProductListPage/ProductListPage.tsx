import { useEffect, useState } from "react";
import type { IProduct } from "../../interfaces/product.interface";
import { getProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard/ProductCard";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";

export default function ProductListPage() {

  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        console.error("failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const filteredProducts = products.filter((product) =>
    `${product.brand} ${product.model}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

const handleSelectItem = (id: string) => {
  setSelectedId(id);
  navigate(`/product/${id}`);
};
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Card className="flex items-center px-4 py-3 w-full sm:w-1/2 md:w-[35%] lg:w-[30%]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="¿ QUÉ ESTÁS BUSCANDO ?"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-200 animate-pulse rounded-xl"
              />
            ))
          : filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isSelected={selectedId === item.id}
                onSelect={handleSelectItem}
              />
            ))}
      </div>
    </div>
  );
}