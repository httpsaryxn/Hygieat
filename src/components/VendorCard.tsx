import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

// Define what data a Vendor has
interface VendorProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  hygieneGrade?: string; // Added optional hygiene grade
}

// Update: Added 'onPress' to the props here
export default function VendorCard({ vendor, onPress }: { vendor: VendorProps, onPress?: () => void }) {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress} // <--- THIS IS THE KEY CHANGE
      className="mb-6 bg-dark-card rounded-2xl overflow-hidden border border-gray-800 shadow-sm"
    >
      
      {/* 1. Image Section */}
      <View className="h-40 w-full relative">
        <Image 
          source={{ uri: vendor.image }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Rating Badge */}
        <View className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-lg flex-row items-center backdrop-blur-md">
          <Ionicons name="star" size={12} color="#00C896" />
          <Text className="text-white text-xs font-bold ml-1">{vendor.rating}</Text>
        </View>
      </View>

      {/* 2. Details Section */}
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-lg font-bold flex-1">{vendor.name}</Text>
          
          {/* Hygiene Badge */}
          <View className={`px-2 py-1 rounded-md border ${
            vendor.hygieneGrade === 'A' 
              ? 'bg-green-900/30 border-green-800' 
              : 'bg-yellow-900/30 border-yellow-800'
          }`}>
             <Text className={`text-[10px] font-bold uppercase ${
               vendor.hygieneGrade === 'A' ? 'text-primary' : 'text-yellow-500'
             }`}>
               {vendor.hygieneGrade ? `Grade ${vendor.hygieneGrade}` : 'Certified'}
             </Text>
          </View>
        </View>
        
        <View className="flex-row items-center mt-3">
          <Ionicons name="location-outline" size={14} color="#A1A1AA" />
          <Text className="text-gray-400 text-xs ml-1">{vendor.distance} away</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}