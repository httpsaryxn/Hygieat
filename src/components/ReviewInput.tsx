import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ReviewInput({ onSubmit }: { onSubmit: (text: string, rating: number) => void }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (reviewText.trim() === '' || rating === 0) {
      Alert.alert("Missing Fields", "Please provide a rating and some text for your review.");
      return;
    }
    onSubmit(reviewText, rating);
    setReviewText('');
    setRating(0);
  };

  return (
    <View className="p-4 bg-dark-card rounded-xl border border-gray-800 mb-6">
      <Text className="text-white font-bold mb-3">Leave a Review (Anonymous)</Text>
      
      {/* Star Rating Selector */}
      <View className="flex-row mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => setRating(star)} 
            className="mr-2"
          >
            <Ionicons 
              name={star <= rating ? "star" : "star-outline"} 
              size={24} 
              color="#00C896"
            />
          </TouchableOpacity>
        ))}
        <Text className="text-gray-500 ml-3 self-end">{rating > 0 ? `${rating}/5 Stars` : 'Rate here'}</Text>
      </View>

      {/* Text Input */}
      <TextInput
        placeholder="Share your experience here..."
        placeholderTextColor="#666"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        className="bg-gray-800 text-white rounded-lg p-3 h-20 mb-4 border border-gray-700"
      />
      
      {/* Submit Button */}
      <TouchableOpacity 
        onPress={handleSubmit} 
        className="bg-primary py-3 rounded-lg items-center"
      >
        <Text className="text-black font-bold text-base">Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
}