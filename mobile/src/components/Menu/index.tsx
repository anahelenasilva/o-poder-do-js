import { useState } from "react";
import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { Product } from "../../types/product";
import { formatCurrency } from "../../utils/format-currency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from "./styles";

export function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seletecProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return <>
    <ProductModal
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      product={seletecProduct}
    />

    <FlatList
      data={products}
      keyExtractor={item => item._id}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <ProductContainer onPress={() => handleOpenModal(product)}>
          <ProductImage source={{
            uri: `http://exp://192.168.1.8:3001/uploads/${product.imagePath}`
          }} />

          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text color="#666" size={14} style={{ marginVertical: 8 }}>{product.description}</Text>
            <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </ProductContainer>
      )}
    />
  </>;
}
