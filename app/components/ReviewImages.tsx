import { StyleSheet, View, FlatList, Modal, TouchableOpacity, Text, Image } from 'react-native';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export type ReviewImagesProps = {};

const ReviewImages = () => {
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = Array.from({ length: 3 }).map((_, index) => `https://picsum.photos/700/700?random=${index}`);

  const openImage = (image: string) => {
    setSelectedImage(image);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Image Gallery */}
      <FlatList
        horizontal
        data={images}
        keyExtractor={(_, index) => `image-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImage(item)}>
            <Image
              source={{ uri: item }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Full-Screen Modal for Image Inspection */}
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
            <Icon name="close-circle" size={42} style={styles.icon} />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}

            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 5,
    marginEnd: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 5,
  },
  icon: {
    color: '#ffffff',
  },
  fullImage: {
    width: '100%',
    height: '60%',
    borderRadius: 5
  },
});

export default ReviewImages;
