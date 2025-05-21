import {
  CameraType,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomTab from '../components/BottomTab';

const Interpreter = () => {
  const cameraRef = useRef<CameraView>(null);
  const [camPerm, requestCamPerm] = useCameraPermissions();
  const [micPerm, requestMicPerm] = useMicrophonePermissions();

  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownInterval = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      await requestCamPerm();
      await requestMicPerm();
    })();
  }, []);

  const startRecording = () => {
    if (!cameraRef.current) return;

    setIsRecording(true);
    setCountdown(15);

    cameraRef.current
      .recordAsync({ maxDuration: 15 })
      .then(video => {
        setRecording(video);
      })
      .catch(e => {
        if (
          !e.message.includes('Recording was stopped before any data could be produced')
        ) {
          console.error('Error al grabar video:', e);
          Alert.alert('Error', 'No se pudo iniciar la grabación.');
        }
      });

    countdownInterval.current = setInterval(() => {
      setCountdown(prev => {
        if (prev !== null && prev > 1) return prev - 1;
        stopRecording();
        return 0;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }

    setIsRecording(false);
    clearInterval(countdownInterval.current!);
    setCountdown(null);
  };

  const sendRecording = async () => {
    if (!recording?.uri) {
      Alert.alert('Atención', 'No hay vídeo para enviar.');
      console.log('No hay video para enviar');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('video', {
        uri: recording.uri,
        name: 'video.mp4',
        type: 'video/mp4',
      } as any);

      const response = await fetch('http://192.168.1.133:5000/upload_video', {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await response.json();
      if (!response.ok || data.status !== 'ok') {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      setPrediction(
        Array.isArray(data.result)
          ? data.result.join(' - ')
          : 'Respuesta inesperada'
      );
      Alert.alert('Resultado', Array.isArray(data.result) ? data.result.join(' - ') : String(data.result));
    } catch (err: any) {
      console.error('Error en fetch:', err);
      setPrediction(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setRecording(null);
    }
  };

  const handlePressIn = () => {
    if (!isLoading) {
      startRecording();
    }
  };

  const handlePressOut = () => {
    if (!isLoading) {
      stopRecording();
      setTimeout(() => {
        sendRecording();
      }, 500);
    }
  };

  if (!camPerm || camPerm.status !== PermissionStatus.GRANTED)
    return <Text>No hay acceso a la cámara</Text>;
  if (!micPerm || micPerm.status !== PermissionStatus.GRANTED)
    return <Text>No hay acceso al micrófono</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          mode="video"
        />

        <TouchableOpacity
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          style={styles.rotateButton}
        >
          <Image
            style={styles.rotateIcon}
            source={require('../../assets/images/ImagesLiveSings/rotation.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Texto del servidor..."
          value={prediction}
          onChangeText={setPrediction}
          editable={false}
        />

        <View style={styles.captureRow}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.captureButton}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isRecording ? 'Grabando...' : 'Mantener para Capturar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.countdownBox}>
            <Text style={styles.countdownText}>
              {countdown !== null ? countdown : ''}
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0056b3',
  },
  cameraContainer: {
    width: '100%',
    height: '60%',
    position: 'relative',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  rotateButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  rotateIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  captureButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    marginRight: 10,
  },
  countdownBox: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  prediction: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default Interpreter;
