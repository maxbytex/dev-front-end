import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard/ProductCard";
import type { IProduct } from "../interfaces/product.interface";

vi.mock("react-loading-skeleton", () => ({
  default: () => <div data-testid="skeleton" />,
}));

const mockProduct: IProduct = {
  id: "ke-gsQbO8qH9PQ-zcdiAJ",
  brand: "Acer",
  model: "Liquid Zest Plus",
  price: "200",
  imgUrl:
    "https://itx-frontend-test.onrender.com/images/ke-gsQbO8qH9PQ-zcdiAJ.jpg",
};

describe("ProductCard", () => {
  it("renders price", () => {
    render(
      <MemoryRouter>
        <ProductCard
          product={mockProduct}
          isSelected={false}
          onSelect={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });

  it('renders "No disponible" when price is empty', () => {
    render(
      <MemoryRouter>
        <ProductCard
          product={{ ...mockProduct, price: "" }}
          isSelected={false}
          onSelect={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("No disponible")).toBeInTheDocument();
  });
});
