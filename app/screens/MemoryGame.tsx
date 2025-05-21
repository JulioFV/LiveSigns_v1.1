import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CARD_IMAGES = [
  { id: '1', image: require('../../assets/images/ImagesLiveSings/a.png'), letter: 'A' },
  { id: '2', image: require('../../assets/images/ImagesLiveSings/b.png'), letter: 'B' },
  { id: '3', image: require('../../assets/images/ImagesLiveSings/c.png'), letter: 'C' },
  { id: '4', image: require('../../assets/images/ImagesLiveSings/a.png'), letter: 'A' },
  { id: '5', image: require('../../assets/images/ImagesLiveSings/b.png'), letter: 'B' },
  { id: '6', image: require('../../assets/images/ImagesLiveSings/c.png'), letter: 'C' },
];

const MemoryGame = () => {
  const router = useRouter();

  const [cards, setCards] = useState(CARD_IMAGES);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [timer, setTimer] = useState(20);
  const [isGameActive, setIsGameActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isGameActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            endGame(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, timer]);

  const shuffleArray = (array: typeof CARD_IMAGES) =>
    array.sort(() => Math.random() - 0.5);

  const resetGame = () => {
    const shuffled = shuffleArray(CARD_IMAGES);
    setCards(shuffled);
    setMatchedCards([]);
    setFlippedCards([]);
    setTimer(20);
    setIsGameActive(false);
  };

  const handleCardPress = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && isGameActive) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].letter === cards[second].letter) {
        setMatchedCards((prev) => [...prev, cards[first].letter]);
        if (matchedCards.length + 1 === CARD_IMAGES.length / 2) {
          endGame(true);
        }
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const startGame = () => {
    resetGame();
    setIsGameActive(true);
  };

  const endGame = (won: boolean) => {
    setIsGameActive(false);
    setModalVisible(true);
    setModalMessage(
      won
        ? '¡Felicitaciones! Has encontrado todos los pares.'
        : 'Tiempo agotado. Intenta de nuevo.'
    );
    setGameWon(won);
  };

  const handleRestart = () => {
    setModalVisible(false);
    startGame();
  };

  const handleFinishGame = () => {
    setModalVisible(false);
    router.back(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memorama</Text>
      <Text style={styles.timer}>Tiempo: {timer} segundos</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity key={card.id} style={styles.card} onPress={() => handleCardPress(index)}>
            {flippedCards.includes(index) || matchedCards.includes(card.letter) ? (
              <Image source={card.image} style={styles.image} />
            ) : (
              <View style={styles.cardBack} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>INICIO</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            {gameWon ? (
              <TouchableOpacity style={styles.finishButton} onPress={handleFinishGame}>
                <Text style={styles.finishButtonText}>Finalizar Juego</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                <Text style={styles.restartButtonText}>Reiniciar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0052cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  startButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 18,
    color: '#0052cc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  restartButton: {
    padding: 10,
    backgroundColor: '#0052cc',
    borderRadius: 5,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
  },
  finishButton: {
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MemoryGame;
