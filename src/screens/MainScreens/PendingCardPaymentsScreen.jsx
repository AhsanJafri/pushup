import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, Avatar, Text, Card, Header} from '@rneui/themed';
import colors from '../../styles/colors';
import routes from '../../navigation/routes';
import Screen from '../../Component/Screen';
import Space from '../../Component/Space';
import {FontSize} from '../../utils/FontSize';
import fonts from '../../styles/fonts';
// Dummy data
const DATA = Array.from({length: 15}, (_, index) => ({
  id: String(index),
  cartId: String(1000 + index),
  quantity: Math.floor(Math.random() * 3) + 1,
  amount: (Math.random() * 100).toFixed(2),
  seller: 'Timothy DiVito',
}));

const Item = ({cartId, quantity, amount, seller, navigation}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => {
      navigation.navigate(routes.PAYMENT_METHOD_SCREEN);
    }}>
    <Card containerStyle={styles.cardContainer}>
      {/* Updated layout for Cart and Qty */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Cart: {cartId}</Text>
        <Text style={styles.quantityText}>Qty: {quantity}</Text>
      </View>
      <Card.Divider />
      <ListItem containerStyle={styles.listItemContainer}>
        <ListItem.Content>
          <View style={styles.details}>
            <Text style={styles.labelText}>Seller:</Text>
            <Text style={styles.valueText}>{seller}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.labelText}>Price:</Text>
            <Text style={styles.valueText}>{`$${amount}`}</Text>
          </View>
        </ListItem.Content>
      </ListItem>
    </Card>
  </TouchableOpacity>
);

const PendingCardPaymentsScreen = ({navigation}) => {
  const renderItem = ({item}) => (
    <Item
      cartId={item.cartId}
      quantity={item.quantity}
      amount={item.amount}
      seller={item.seller}
      navigation={navigation}
    />
  );

  return (
    <Screen>
      <Header
        containerStyle={{backgroundColor: 'transparent'}}
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: 'transparent',
        }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{
          text: 'Pending Card Payments',
          style: {
            color: 'white',
            fontSize: FontSize(14),
            fontFamily: fonts.semiBold,
          },
        }}
      />

      {/* <Space size={10} /> */}
      
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Space size={10} />}
        ListFooterComponent={() => <Space size={50} />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    marginTop: 20,
    paddingHorizontal: 16
  },
  cardContainer: {
    width: '100%',
    borderWidth: 0,
    backgroundColor: colors.mediumDarkBlue,
    borderRadius: 16,
    shadowColor: colors.mediumDarkBlue,
    // elevation: 13,
    marginHorizontal: 8,

    shadowOpacity: 0.15,
    shadowRadius: 4,

    marginVertical: 6,
    marginHorizontal: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 17,
    paddingTop: 10,
    paddingBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    // Align to left
  },
  quantityText: {
    fontSize: 16,
    color: colors.white,
    // Align to right
  },
  listItemContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: colors.mediumDarkBlue,
  },
  sellerText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#333',
    marginRight: 4,
    color: colors.white,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600', // semi-bold
    // color: '#333',
    color: colors.white,
  },
});

export default PendingCardPaymentsScreen;
