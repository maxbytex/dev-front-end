import { beforeEach, describe, expect, it } from "vitest";
import type { IProduct, IProductDetail } from "../interfaces/product.interface";
import { getCache, setProductDetail, setProducts } from "../services/cache";

const mockProduct: IProduct = {
  id: "ke-gsQbO8qH9PQ-zcdiAJ",
  brand: "Acer",
  model: "Liquid Zest Plus",
  price: "200",
  imgUrl: "https://itx-frontend-test.onrender.com/images/ke-gsQbO8qH9PQ-zcdiAJ.jpg",
};
const mockDetail: IProductDetail = {
  id: "ke-gsQbO8qH9PQ-zcdiAJ",
  brand: "Acer",
  model: "Liquid Zest Plus",
  price: "200",
  imgUrl: "https://itx-frontend-test.onrender.com/images/ke-gsQbO8qH9PQ-zcdiAJ.jpg",
  cpu: "Quad-core 1.3 GHz Cortex-A53",
  ram: "2 GB RAM",
  os: "Android 6.0 (Marshmallow)",
  displayResolution: "5.5 inches (~70.3% screen-to-body ratio)",
  battery: "Non-removable Li-Ion 5000 mAh battery",
  primaryCamera: "13 MP, phase detection/laser autofocus, LED flash",
  dimentions: "154 x 77 x 10 mm (6.06 x 3.03 x 0.39 in)",
  weight: "",
  options: {
    colors: [{ code: 1000, name: "Blue" }, { code: 1001, name: "White" }],
    storages: [{ code: 2000, name: "16 GB" }],
  },
};

describe("cache", () => {
  beforeEach(() => localStorage.clear());

  it("returns null when cache is empty", () => {
    expect(getCache()).toBeNull();
  });

  it("returns null and removes key when cache is expired", () => {
    localStorage.setItem(
      "app_cache",
      JSON.stringify({
        expiresAt: Date.now() - 1,
        products: [],
        productDetails: {},
      }),
    );
    expect(getCache()).toBeNull();
    expect(localStorage.getItem("app_cache")).toBeNull();
  });

  it("returns cache when not expired", () => {
    const valid = {
      expiresAt: Date.now() + 3_600_000,
      products: [mockProduct],
      productDetails: {},
    };
    localStorage.setItem("app_cache", JSON.stringify(valid));
    expect(getCache()).toEqual(valid);
  });

  it("setProducts stores products with future expiresAt", () => {
    setProducts([mockProduct]);
    const cache = getCache();
    expect(cache?.products).toEqual([mockProduct]);
    expect(cache?.expiresAt).toBeGreaterThan(Date.now());
  });

  it("setProductDetail merges detail without overwriting products", () => {
    setProducts([mockProduct]);
    setProductDetail("ke-gsQbO8qH9PQ-zcdiAJ", mockDetail);
    const cache = getCache();
    expect(cache?.productDetails["ke-gsQbO8qH9PQ-zcdiAJ"]).toEqual(mockDetail);
    expect(cache?.products).toEqual([mockProduct]);
  });

  it("setProductDetail preserves existing expiresAt", () => {
    setProducts([mockProduct]);
    const before = getCache()!.expiresAt;
    setProductDetail("ke-gsQbO8qH9PQ-zcdiAJ", mockDetail);
    expect(getCache()!.expiresAt).toBe(before);
  });
});
