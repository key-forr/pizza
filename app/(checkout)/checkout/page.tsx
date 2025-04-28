import { Container, Title, WhiteBlock } from "@/components/shared";
import { Input } from "@/components/ui";

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title
        text="Оформлення замовлення"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        {/*Ліва частина*/}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">12424</WhiteBlock>

          <WhiteBlock title="2. Персональні дані">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Ім'я"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Прізвище"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адреса доставки">
            <div className="flex flex-col gap-5">
              <Input name="email" className="text-base" placeholder="E-Mail" />
            </div>
          </WhiteBlock>
        </div>

        {/*Права частина*/}
        <div className="w-[450px]">123123</div>
      </div>
    </Container>
  );
}
