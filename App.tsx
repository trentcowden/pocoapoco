import { Audio } from 'expo-av'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function App() {
  const [r, setR] = useState<undefined | Audio.Recording>()

  async function createRecording() {
    const { recording } = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      onRecordingStatusUpdate,
      1000
    )
    setR(recording)
  }

  useEffect(() => {
    Audio.requestPermissionsAsync()
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    })
  }, [])

  function onRecordingStatusUpdate(status: Audio.RecordingStatus) {
    console.log(status)
  }

  function record() {}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={createRecording}
        style={{
          width: 100,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: r ? 'red' : 'gray',
        }}
      >
        <Text>Record</Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
