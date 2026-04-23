import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IProductDetail } from "../interfaces/product.interface";
import { getProductDetail } from "../services/api";
import * as cache from "../services/cache";


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

describe("api", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
  });



    it("fetches and caches when detail is not cached", async () => {
      vi.spyOn(cache, "getCache").mockReturnValue(null);
      const setCacheSpy = vi
        .spyOn(cache, "setProductDetail")
        .mockImplementation(() => {});
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve(mockDetail),
        } as Response),
      );
      const result = await getProductDetail("ke-gsQbO8qH9PQ-zcdiAJ");
      expect(result).toEqual(mockDetail);
      expect(setCacheSpy).toHaveBeenCalledWith("ke-gsQbO8qH9PQ-zcdiAJ", mockDetail);
    });
 

});
