import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductCard,
  ProductsGroupList,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Всі піци" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* {Фільтрація} */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* {Список товарів} */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Піцци"
                items={[
                  {
                    id: 1,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: "Рікка",
                    imageUrl:
                      "https://img.freepik.com/premium-photo/isolated-pepperoni-pizza-with-salami_219193-8089.jpg?semt=ais_hybrid",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
