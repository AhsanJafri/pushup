import React from 'react';
import {
  Modal,
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Input} from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../Space';
import {UserSearchProfile} from '..';

const {width, height} = Dimensions.get('window');
const modalWidth = width * 0.8;
const modalHeight = height * 0.8;

const CustomModal = ({list, onAction, onClose}) => {
  const [search, setSearch] = React.useState('');
  return (
    <Modal
      transparent={true}
      visible
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modal, {width: modalWidth, height: modalHeight}]}>
          <Space size={15} />
          <Text style={styles.title}>Send Pushups</Text>
          <Space size={15} />
          <Input
            textContentType="username"
            onChangeText={e => setSearch(e)}
            value={search}
            labelStyle={styles.label}
            placeholder="Search friend"
            errorStyle={styles.errorText}
            style={{fontFamily: fonts.regular, fontSize: FontSize(12)}}
            leftIcon={<FontAwesome name="user" size={24} color="#6397b7" />}
            leftIconContainerStyle={{marginHorizontal: 8}}
            inputContainerStyle={styles.inputContainer}
            autoComplete="email"
          />
          <FlatList
            data={list.filter(
              item =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()),
            )}
            keyExtractor={item => JSON.stringify(item)}
            renderItem={({item}) => {
              return (
                <UserSearchProfile
                  data={item}
                  isFriend
                  onAction={() => onAction(item)}
                />
              );
            }}
            ListEmptyComponent={() => (
              <Text style={styles.subheaderText}>No User in Friend List</Text>
            )}
          />
          <TouchableOpacity style={styles.closebtn} onPress={onClose}>
            <FontAwesome name="close" size={24} color={colors.mediumDarkBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 1,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: FontSize(16),
    fontFamily: fonts.regular,
    textAlign: 'center',
    borderColor: colors.gray,
  },
  label: {
    color: 'white',
    fontFamily: fonts.semiBold,
    fontSize: FontSize(10),
  },
  inputContainer: {
    fontFamily: fonts.regular,
    fontSize: FontSize(10),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grayInput,
    borderColor: colors.white,
  },
  closebtn: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  subheaderText: {
    fontSize: FontSize(14),
    fontFamily: fonts.semiBold,
    alignSelf: 'center',
  },
});

export default CustomModal;
