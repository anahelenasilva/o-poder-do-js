import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { formatCurrency } from "../../utils/format-currency";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { Product, ProductImage, ProductDetails, Separator, AddToCartButton } from "./styles";

export function Menu() {
  return <FlatList
    data={products}
    keyExtractor={item => item._id}
    style={{ marginTop: 32 }}
    contentContainerStyle={{ paddingHorizontal: 24 }}
    ItemSeparatorComponent={Separator}
    renderItem={({ item: product }) => (
      <Product>
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
      </Product>
    )}
  />;
}
