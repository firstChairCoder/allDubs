import React, { useMemo, useRef, useState } from "react";
import { View, StyleProp, ViewStyle, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import DatePicker from "react-native-neat-date-picker";
import ModernKeyboard from "react-native-modern-keyboard";
import { TextInput } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import SegmentedControl from "react-native-segmented-control-2";
import moment from "moment";
/**
 * ? Local Imports
 */
import createStyles from "./styles";
import Text from "@components/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Button from "@components/Button";
import CategorySelectionModal from "@components/CategorySelectionModal";
import { EXPENSE_CATEGORIES } from "@constants";
import { ICategory } from "@services/models";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface AddTransactionProps {
  style?: CustomStyleProp;
  navigation: any;
}

const AddTransaction: React.FC<AddTransactionProps> = ({
  style,
  navigation,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transaction, setTransaction] = useState<string>();
  const categoryModalRef = useRef<Modalize>(null);
  const [category, setCategory] = useState<ICategory>(EXPENSE_CATEGORIES[0]);

  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleCancelPress = () => {
    navigation.pop();
  };

  const handleDatePickerPress = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false);
  };

  const onConfirm = (output: any) => {
    // You should close the modal in here
    setShowDatePicker(false);

    setSelectedDate(output.date);

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    console.log(output.date);
    console.log(output.dateString);
  };

  const handleCategoryPress = () => {
    categoryModalRef.current?.open();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <RNBounceable onPress={handleCancelPress}>
        <Text h4 color={colors.blue}>
          Cancel
        </Text>
      </RNBounceable>
      <Text h4 bold color={colors.blue}>
        Save
      </Text>
    </View>
  );

  const renderTab = (
    icon: string,
    text: string,
    color: string,
    index: number
  ) => {
    // const color = selectedTabIndex === index ? colors.white : colors.offBlack;
    const selectedColor = selectedTabIndex === index ? color : colors.offBlack;
    return (
      <View style={styles.tab}>
        <Icon name={icon} type="Entypo" color={selectedColor} />
        <Text bold color={selectedColor} style={styles.tabTextStyle}>
          {text}
        </Text>
      </View>
    );
  };

  const renderSegmentedControl = () => (
    <SegmentedControl
      tabs={[
        renderTab("circle-with-plus", "Income", colors.incomeGreen, 1),
        renderTab("circle-with-minus", "Expenses", colors.expensesRed, 0),
      ]}
      style={styles.segmentedControlStyle}
      onChange={(index: number) => setSelectedTabIndex(index)}
    />
  );

  const renderCategoryButton = () => (
    <Button
      text={category.name}
      style={styles.categoryButton}
      color={colors.offBlack}
      iconComponent={
        <Image
          resizeMode="contain"
          source={category.icon}
          style={styles.categoryIcon}
        />
      }
      fontFamily={"Medium"}
      onPress={handleCategoryPress}
    />
  );

  const renderDateAndCategory = () => (
    <View style={styles.dateAndCategory}>
      {renderDatePickerButton()}
      {renderCategoryButton()}
    </View>
  );

  const renderDatePickerButton = () => (
    <Button
      style={styles.datePickerButton}
      color={colors.offBlack}
      text={moment(selectedDate).format("D MMM YYYY")}
      onPress={handleDatePickerPress}
    />
  );

  const renderTransactionKeyboard = () => (
    <View style={styles.transactionKeyboard}>
      <TextInput
        style={[
          styles.transactionTextInput,
          {
            color: transaction ? colors.offBlack : colors.offGray,
          },
        ]}
      >
        {transaction || "USD"}
      </TextInput>
      <ModernKeyboard
        onInputChange={(val: string) => {
          setTransaction(val);
        }}
      />
    </View>
  );

  const renderDatePicker = () => (
    <DatePicker
      isVisible={showDatePicker}
      mode={"single"}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );

  const renderCategorySelectionModal = () => (
    <CategorySelectionModal
      modalRef={categoryModalRef}
      onSelect={(selectedCategory: ICategory) => {
        setCategory(selectedCategory);
        categoryModalRef.current?.close();
      }}
    />
  );

  return (
    <View style={[styles.container, style]}>
      {renderHeader()}
      {renderSegmentedControl()}
      {renderDateAndCategory()}

      {renderTransactionKeyboard()}
      {renderDatePicker()}
      {renderCategorySelectionModal()}
    </View>
  );
};

export default AddTransaction;
