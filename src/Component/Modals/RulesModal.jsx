import React from 'react';
import {Dialog} from '@rneui/themed';
import {Text, StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

const rules = [
  {
    id: 1,
    title:
      'When you receive the notifications you must drop and do 10 pushups immediately',
  },
  {id: 2, title: 'Do not spams your friends'},
  {id: 3, title: 'Send pushups at random times'},
  {id: 4, title: 'Have fun'},
];
const RulesModal = ({onClose}) => {
  return (
    <Dialog isVisible onBackdropPress={onClose}>
      <Dialog.Title title="Rules" />
      {rules.map((item, index) => {
        return (
          <Text key={index} style={styles.txt}>
            {item.id}. {item.title}.
          </Text>
        );
      })}
      <Dialog.Actions>
        <Dialog.Button title="Cancel" onPress={onClose} />
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontFamily: fonts.regular,
    margin: 2,
  },
});

export default RulesModal;
