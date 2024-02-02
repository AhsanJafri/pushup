import {useFormikContext} from 'formik';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../styles/colors';
import defaultStyles from '../styles';
import AppText from './AppText';
import fonts from '../styles/fonts';

const AppPicker = ({
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
        label: item[labelPropertyName],
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
          setValue={setSelectedValue}
          placeholder={placeholder}
          dropDownDirection={direction}
          listMode={data.length > 10 ? 'MODAL' : 'SCROLLVIEW'}
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
        />
      </View>
    </>
  );
};

export default AppPicker;
