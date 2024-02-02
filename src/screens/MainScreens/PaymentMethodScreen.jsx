import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Header, Card, Button, Text, Image} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import CardStatusModal from '../../Component/CardStatusModal';
import {FontSize} from '../../utils/FontSize';
import fonts from '../../styles/fonts';
import Screen from '../../Component/Screen';

import AppText from '../../Component/AppText';
import defaultStyles from '../../styles/index';
const PaymentMethodScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardReadSuccess, setCardReadSuccess] = useState(false);

  // Simulate card read result
  const handleCardRead = () => {
    setModalVisible(true);
    // setCardReadSuccess(true); // or false if the card read fails
  };
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
        centerComponent={{text: 'Cart View', style: styles.headerText}}
      />
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>Collect Payment Method</Card.Title>
        <Card.Divider />
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Cart #</Text>
          <Text style={styles.valueText}>130</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Total:</Text>
          <Text style={styles.valueText}>$30</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Qty:</Text>
          <Text style={styles.valueText}>3</Text>
        </View>
        <Card.Divider style={styles.divider} />
        <View style={{height: 30}} />

        <Text style={styles.instructionsText}>
          Tap, Insert or Swipe Card Now
        </Text>
                  
        <TouchableOpacity
          onPress={handleCardRead}
          style={{borderWidth: 1, borderRadius: 30, height: 300, borderColor: colors.white}}>
          <AppText
            style={{
              textAlign: 'center',
              fontSize: defaultStyles.textMedium,
              color: colors.white,
              marginTop: 10,
            }}>
            Waiting for Input...
          </AppText>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={45} color={colors.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.imagePlaceholder} />
      </Card>
      <CardStatusModal
        visible={modalVisible}
        success={cardReadSuccess}
        onDismiss={() => setModalVisible(false)}
        navigation={navigation}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: FontSize(14),
    fontFamily: fonts.semiBold,
  },
  cardContainer: {
    borderRadius: 5,
    margin: 10,
    padding: 15,
    elevation: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  divider: {
    marginVertical: 10,
  },
  instructionsText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.white,
  },
  imagePlaceholder: {
    height: 150,
    width: '100%',
    backgroundColor: colors.grey5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: colors.white,
  },
});

export default PaymentMethodScreen;
