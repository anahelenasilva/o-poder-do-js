import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { CartItem } from "../../types/cart-item";
import { Product } from "../../types/product";
import { Button } from "../Button";
import { Cart } from "../Cart";
import { Categories } from "../Categories";
import { Header } from "../Header";
import { Menu } from "../Menu";
import { TableModal } from "../TableModal";
import { products as mockedProducts } from "../../mocks/products";
import { Container, CategoriesContainer, MenuContainer, FooterContainer, Footer, CenteredContainer } from "./styles";
import { Empty } from "../Icons/Empty";
import { Text } from "../Text";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);
  const [products] = useState<Product[]>(mockedProducts);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder(){
    setSelectedTable("");
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          product,
          quantity: 1,
        });
      }
      else {
        const newItems = [...prevState];
        const item = newItems[itemIndex];
        newItems[itemIndex] = {
          ...item,
          quantity: item.quantity + 1,
        };

        return newItems;
      }
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];

      const newItems = [...prevState];

      if (item.quantity === 1) {
        newItems.splice(itemIndex, 1);
      }
      else {
        newItems[itemIndex] = {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return newItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder} />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu
                  onAddToCart={handleAddToCart}
                  products={products} />
              </MenuContainer>
            ) :
              (
                <CenteredContainer>
                  <Empty />
                  <Text color="#666" style={{ marginTop: 24 }}>Nenhum produto foi encontrado</Text>
                </CenteredContainer>
              )}
          </>
        )}

      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable &&
            <Button onPress={() => setIsTableModalVisible(true)} disabled={isLoading}>
                Novo Pedido
            </Button>
          }

          {selectedTable && (
            <Cart
              items={cartItems}
              onAdd={handleAddToCart}
              onDerement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      ></TableModal>
    </>
  );
}
