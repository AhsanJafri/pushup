import {Card, Header} from '@rneui/base';
import React from 'react';
import {FlatList, Touchable, TouchableOpacity, View, StyleSheet} from 'react-native';
import Screen from '../../Component/Screen';
import colors from '../../styles/colors';
import AppText from '../../Component/AppText';
import {Button, Icon} from '@rneui/themed';
import routes from '../../navigation/routes';
import Space from '../../Component/Space';
import fonts from '../../styles/fonts';
import { FontSize } from '../../utils/FontSize'; 

// dummy Data
const DATA = Array.from({length: 2}, (_, index) => ({
  id: String(index),
  icon: 'terminal',
  title: 'STR412345332',
  connected: index % 2 == 0 ? true : false,
}));

const ShowTerminal = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.FIRMWARE_UPDATE_SCREEN)}
      key={item.id}
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name={'terminal'} color={colors.white} />
        <AppText
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: fonts.semiBold,
            color: colors.black,
            marginLeft: 16,
            color: colors.white,
          }}>
          {item.title}
        </AppText>
      </View>

      <Button
        disabled={item.connected}
        title={'Disconnect'}
        color={colors.primary}
        containerStyle={
            {
            alignSelf: 'center',
            minWidth: 100
          } 
        }
        buttonStyle={{  borderRadius: 25,
          backgroundColor: colors.buttonColor, 
        }}
        titleStyle={{  
        fontWeight: 'bold',
        fontFamily: fonts.bold,
        paddingHorizontal: 5
     }}
      />
    </TouchableOpacity>
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
          text: 'Connect to Stripe Reader',
          style: {
            color: colors.white,
            fontSize: FontSize(13),
            fontFamily: fonts.semiBold,
          },
        }}
      />

      <View style={styles.container}>

        <AppText
          style={{
            fontSize: FontSize(16),
            fontWeight: 'bold',
            fontFamily: fonts.semiBold,
            // marginBottom: 16,
            color: colors.white,
          }}
          // h4={true}
        >
          Please select from the below readers to connect.
        </AppText>
      <Space size={32} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{}}
        ItemSeparatorComponent={() => <Space size={16} />}
      />
      </View>
    </Screen>
  );

  
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 16,
    marginTop: 32 
  },})


export default ShowTerminal;
