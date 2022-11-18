import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/cart-item";
import { Product } from "../../types/product";
import { formatCurrency } from "../../utils/format-currency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import { Actions, Item, ProductContainer, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from "./styles";

interface CartProps {
    items: CartItem[]
    onAdd: (product: Product) => void;
    onDerement: (product: Product) => void;
    onConfirmOrder: () => void;
}

export function Cart({ items, onAdd, onDerement, onConfirmOrder }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading] = useState(false);

  const total = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {items.length > 0 &&
     (
       <FlatList
         data={items}
         keyExtractor={item => item.product._id}
         showsVerticalScrollIndicator={false}
         style={{ marginBottom: 20, maxHeight: 150 }}
         renderItem={({ item }) => (
           <Item>
             <ProductContainer>
               <Image
                 source={{
                   uri:  `http://exp://192.168.1.8:3001/uploads/${item.product.imagePath}`
                 }}
               />

               <QuantityContainer>
                 <Text size={14} color="#666">{item.quantity}x</Text>
               </QuantityContainer>

               <ProductDetails>
                 <Text size={14} weight="600">{item.product.name}</Text>
                 <Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency( item.product.price)}</Text>
               </ProductDetails>
             </ProductContainer>

             <Actions>
               <TouchableOpacity
                 style={{ marginRight: 24 }}
                 onPress={() => onAdd(item.product)}>
                 <PlusCircle />
               </TouchableOpacity>

               <TouchableOpacity onPress={() => onDerement(item.product)}>
                 <MinusCircle />
               </TouchableOpacity>
             </Actions>
           </Item>
         )}
       />
     )
      }

      <Summary>
        <TotalContainer>
          {items.length > 0 ? (
            <>
              <Text size={14} color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )
          }
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={items.length === 0}
          loading={isLoading}
        >
            Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
