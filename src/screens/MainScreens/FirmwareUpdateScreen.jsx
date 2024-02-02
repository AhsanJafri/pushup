import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, Card, Text, Button, LinearProgress} from '@rneui/themed';
import colors from '../../styles/colors';
import routes from '../../navigation/routes';
import Screen from '../../Component/Screen';
import {FontSize} from '../../utils/FontSize';
import fonts from '../../styles/fonts';

const FirmwareUpdateScreen = ({navigation}) => {
  const [progress, setProgress] = React.useState(0);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const intervalRef = React.useRef(null);

  const startUpdate = () => {
    setIsUpdating(true);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress < 1) {
            return prevProgress + 0.02;
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsUpdating(false);
            navigation.navigate(routes.PENDING_CARD_PAYMENTS_SCREEN);
            return 0;
          }
        });
      }, 100);
    }
  };

  // Use useEffect to synchronize progress bar and progress text
  useEffect(() => {
    return () => {
      // Cleanup function to clear the interval when component is unmounted
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  useEffect(() => {
    startUpdate();
  }, []);
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
          text: 'Firmware Update',
          style: {
            color: 'white',
            fontSize: FontSize(14),
            fontFamily: fonts.semiBold,
          },
        }}
      />

      <View style={styles.content}>
        <Card
          containerStyle={{
            borderRadius: 16,
            // shadowColor: colors.white,
            borderColor: 'transparent',
            // elevation: 12,
            width: '100%',
            alignSelf: 'center',
            backgroundColor: colors.mediumDarkBlue,
          }}>
          <Text style={styles.deviceId}>STR344534345</Text>
          <Text style={styles.instruction}>
            This card reader is performing a required update. Remain on this
            screen until the update has been completed.
          </Text>
        </Card>

        {/* Centered Progress Bar */}
        <View style={styles.progressBarContainer}>
          <LinearProgress
            value={progress}
            trackColor={colors.lightblue}
            color={colors.iconColor}
            animation={false}
          />
          <Text style={styles.progressText}>{`${(progress * 100).toFixed(
            0,
          )}%`}</Text>
        </View>

        {/* Version Details and Start Button */}
        {/* <View style={styles.bottomContent}>
          <Button
            title={isUpdating ? 'Updating...' : 'Start Update'}
            onPress={startUpdate}
            disabled={isUpdating}
            buttonStyle={styles.updateButton}
            titleStyle={styles.updateButtonText}
            containerStyle={styles.updateButtonContainer}
          />
        </View> */}
        <Text style={styles.versionInfo}>
          Current Version: x.x.x Update Available: y.y.y
        </Text>
      </View>
    </Screen>
  );
};

export default FirmwareUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 16,
  },
  deviceId: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: fonts.semiBold,
    fontSize: FontSize(14),
    color: colors.white,
  },
  instruction: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: FontSize(13),
    fontFamily: fonts.regular,
    color: colors.white,
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    textAlign: 'center',
    marginVertical: 10,
    color: colors.white,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  versionInfo: {
    textAlign: 'center',
    marginVertical: 10,
    color: colors.white,
  },
  updateButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
  },
  updateButtonText: {
    fontWeight: 'bold',
    fontSize: FontSize(14),
    fontFamily: fonts.bold,
    paddingHorizontal: 10,
  },
  updateButtonContainer: {
    alignSelf: 'center',
    marginTop: 16,
    height: 50,
    minWidth: 150,
  },
});
