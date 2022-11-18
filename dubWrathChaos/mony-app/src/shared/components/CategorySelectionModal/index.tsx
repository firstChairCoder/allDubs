import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Text from "@components/TextWrapper";
import { Modalize } from "react-native-modalize";
import { ScreenHeight } from "@freakycoder/react-native-helpers";

import CategoryButton from "../CategoryButton";
import { EXPENSE_CATEGORIES } from "@constants";
import { ICategory } from "@services/models";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface CategorySelectionModalProps {
  style?: CustomStyleProp;
  modalRef: any;
  onSelect: (selectedCategory: ICategory) => void;
}

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  style,
  modalRef,
  onSelect,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modalize
      ref={modalRef}
      modalHeight={ScreenHeight * 0.4}
      modalStyle={styles.modalStyle}
    >
      <View style={[styles.container, style]}>
        <Text h1 bold>
          Categories
        </Text>
        <FlatList
          data={EXPENSE_CATEGORIES}
          renderItem={({ item, index }) => {
            const { name, icon } = item;
            return (
              <CategoryButton
                style={{ marginVertical: 8 }}
                key={index}
                source={icon}
                category={name}
                onPress={() => onSelect?.(item)}
              />
            );
          }}
          numColumns={3}
          columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
          contentInset={{ bottom: 16 }}
        />
      </View>
    </Modalize>
  );
};

export default CategorySelectionModal;
