import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import type { IProduct } from "../../interfaces/product.interface";
import Card from "../ui/Card";

interface ProductCardProps {
  product: IProduct;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card
      hoverable
      onClick={() => onSelect(product.id)}
      className={isSelected ? "ring-2 ring-blue-500" : ""}
    >
      <div className="bg-white h-96 w-full flex items-center justify-center p-4">
        {!imgLoaded && <Skeleton height="100%" width="100%" />}
        <img
          src={product.imgUrl}
          alt={product.model}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className={`h-full w-full object-contain ${imgLoaded ? "block" : "hidden"}`}
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
        <h3 className="font-semibold text-gray-800 mt-0.5 leading-tight">{product.model}</h3>
        {!product.price ? (
          <p className="mt-2 text-sm text-gray-400">No disponible</p>
        ) : (
          <p className="mt-2 font-bold text-lg text-gray-800">{parseFloat(product.price).toFixed(2).replace('.', ',')} €</p>
        )}
      </div>
    </Card>
  );
}
