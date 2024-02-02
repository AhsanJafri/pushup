import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Modal, Text} from 'react-native';
import {Card, Header, Button} from '@rneui/themed';
import colors from '../styles/colors';

const CardStatusModal = ({visible, success, onDismiss, navigation}) => {
  useEffect(() => {
    if (visible && success) {
      setTimeout(() => {
        onDismiss();
        navigation.goBack();
      }, 2000);
    }
  }, [visible]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={{
        backgroundColor: 'rgba(0,0,0,0.9)',
      }}
      visible={visible}
      onRequestClose={onDismiss}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalView}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.modalText}>
              {success
                ? 'The card has been read successfully.'
                : 'The card was not able to be processed. Please Try Again'}
            </Text>
            {success ? (
              <Text style={styles.statusSubtext}>
                Returning to Pending Payments List...
              </Text>
            ) : (
              <Button
                title="Continue"
                onPress={onDismiss}
                buttonStyle={styles.continueButton}
                titleStyle={styles.continueButtonText}
                containerStyle={styles.continueButtonContainer}
              />
            )}
          </Card>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  statusSubtext: {
    color: 'black',
    fontSize: 14,
    marginBottom: 15,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: 'white',
  },
  continueButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 99,
  },
  continueButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  continueButtonContainer: {
    alignSelf: 'center',
    marginTop: 16,
    height: 50,
    width: 200,
  },
});

export default CardStatusModal;
