import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../styles/fonts';
import {FontSize} from '../utils/FontSize';
import colors from '../styles/colors';

const UserScore = ({score = 0, onAction}) => {
  return (
    <View>
      <View style={styles.scoreDiv}>
        <Text style={styles.title}>Score: </Text>
        <Text style={styles.score}>{score}</Text>
        <TouchableOpacity onPress={() => onAction('Increment')}>
          <AntDesign name="pluscircleo" size={22} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onAction('Decrement')}>
          <AntDesign
            name="minuscircleo"
            size={22}
            style={[styles.icon, {marginLeft: 2}]}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>Every 1 pushup is 1 point </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: FontSize(16),
  },
  score: {
    fontFamily: fonts.bold,
    fontSize: FontSize(18),
    color: colors.purple,
  },
  note: {
    fontFamily: fonts.regular,
    fontSize: FontSize(10),
    color: colors.gray,
  },
  icon: {
    padding: 2,
    marginLeft: 8,
    color: colors.gray,
  },
});

export default UserScore;
