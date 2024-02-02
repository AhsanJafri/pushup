import {useFormikContext} from 'formik';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../styles/colors';
import defaultStyles from '../styles';
import AppText from './AppText';
import fonts from '../styles/fonts';

const MultilineAppPicker = ({
  data,
  name,
  placeholder,
  open,
  setOpen,
  labelPropertyName = 'label',
  valuePropertyName = 'value',
  disabled = false,
  direction = 'DEFAULT',
  zIndex = 10,
  onItemSelect,
  preSelectedValue,
  multiline = false,
}) => {
  const items = [];

  const [selectedValue, setSelectedValue] = useState(
    preSelectedValue || items[0],
  );

  useEffect(() => {
    console.log('data', data);
    console.log('selectedValue>>', selectedValue);
    onItemSelect(selectedValue);
  }, [selectedValue]);

  data &&
    data.forEach((item, index) => {
      items.push({
        label: `${item[labelPropertyName]}${
          item['department_group_name']
            ? `\n${item['department_group_name']}`
            : ``
        }`,
        value: item[valuePropertyName],
      });
    });

  return (
    <>
      <View style={{width: '100%'}}>
        <DropDownPicker
          zIndex={zIndex}
          disabled={disabled}
          multiple={false}
          autoScroll={true}
          open={open}
          value={selectedValue}
          items={items}
          setOpen={setOpen}
          addCustomItem={true}
          setValue={setSelectedValue}
          placeholder={placeholder}
          dropDownDirection={direction}
          
          // renderListItem={item => {
          //   // console.log('item>>', data.find(item => item.abv === item.item.) );
          //   console.log('item>>', item.item.value);
          //   return <Text>Hello</Text>;
          // }}
          // listMode={data.length > 10 ? 'MODAL' : 'SCROLLVIEW'}
          style={[
            defaultStyles.textInput,
            {
              backgroundColor: colors.white,
            },
          ]}
          dropDownContainerStyle={{
            borderWidth: StyleSheet.hairlineWidth,
            padding: 0,
            backgroundColor: colors.white,
           }}
          ArrowDownIconComponent={() => (
            <Icon name="arrow-drop-down" size={20} color={colors.textDark} />
          )}
          ArrowUpIconComponent={() => (
            <Icon name="arrow-drop-up" size={20} color={colors.textDark} />
          )}
          searchContainerStyle={{
            borderColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderTopWidth: 0,
          }}
          searchTextInputStyle={{
            borderColor: 'gray',
            borderWidth: StyleSheet.hairlineWidth,
            color: colors.textDark,
          }}
          iconContainerStyle={{
            borderColor: 'gray',
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 500,
            overflow: 'hidden',
          }}
          placeholderStyle={{
            color: colors.black,
            fontFamily: fonts.regular,
          }}
          textStyle={{
            fontSize: defaultStyles.textMedium,
            color: colors.black,
          }}
          labelStyle={{
            color: colors.black,
          }}
          listItemContainerStyle={{borderTopColor: 'black', borderTopWidth: 0.5, height: 50}}
        />
      </View>
    </>
  );
};

export default MultilineAppPicker;
