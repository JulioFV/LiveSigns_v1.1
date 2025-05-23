// components/ForoCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ForoCardProps {
  comentario: string;
  autor: string;
  creadoEn: string;
}

const ForoCard: React.FC<ForoCardProps> = ({ comentario, autor, creadoEn }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.autor}>{autor}</Text>
      <Text style={styles.date}>{new Date(creadoEn).toLocaleString()}</Text>
      <Text style={styles.comentario}>{comentario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  autor: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  comentario: {
    fontSize: 14,
    color: '#333',
  },
});

export default ForoCard;
