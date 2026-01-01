import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'; // Added Firebase imports
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ReviewInput from '../../src/components/ReviewInput'; // We will create this component
import { db } from '../../src/services/firebaseConfig';

// === MOCK DATA FOR UI (Keep as Fallback) ===
const DEFAULT_MENU_ITEM_IMAGE = "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=200";

// Interface to match Firestore data structure
interface VendorData {
  name: string;
  image: string;
  hygieneGrade: string;
  rating: number;
  description: string;
  lat: number;
  lng: number;
  menu: { name: string; price: string; image: string }[];
  reviews?: any[]; // Array of review objects
}

export default function VendorDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const vendorId = params.id as string;
  
  const [vendorData, setVendorData] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  // 1. Fetch Full Vendor Details (Description, Menu, Coordinates)
  useEffect(() => {
    if (!vendorId) return;

    const docRef = doc(db, 'vendors', vendorId);
    
    // Fetch the main document
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data() as VendorData;

        // Ensure lat/lng are numbers for MapView
        setVendorData({
            ...data,
            lat: parseFloat(data.lat as any) || 0,
            lng: parseFloat(data.lng as any) || 0,
            rating: data.rating || 4.5
        });
      } else {
        console.warn("No such vendor document!");
      }
      setLoading(false);
    });

    // 2. Fetch Real-time Reviews from Subcollection
    const reviewsRef = collection(db, 'vendors', vendorId, 'reviews');
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
        const liveReviews = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setReviews(liveReviews);
    });

    return () => unsubscribe();
  }, [vendorId]);


  if (loading || !vendorData) {
    return (
      <View className="flex-1 bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#00C896" />
        <Text className="text-gray-400 mt-4">Loading stall details...</Text>
      </View>
    );
  }

  // --- REVIEW SUBMISSION HANDLER ---
  const handleReviewSubmit = async (reviewText: string, rating: number) => {
      if (!reviewText || rating === 0) return;

      try {
          const reviewsRef = collection(db, 'vendors', vendorId, 'reviews');
          await addDoc(reviewsRef, {
              reviewerId: 'anonymous_user_' + Math.random().toString(36).substring(7), // Anonymous ID for now
              rating: rating,
              text: reviewText,
              likes: 0,
              dislikes: 0,
              timestamp: serverTimestamp(),
          });
          alert("Review submitted successfully!");
      } catch (e) {
          console.error("Error adding document: ", e);
          alert("Failed to submit review.");
      }
  };


  return (
    <View className="flex-1 bg-dark-bg">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* === 1. HERO IMAGE === */}
        {/* ... (Keep Hero Image Section) ... */}
        <View className="relative h-64 w-full">
          <Image 
            source={{ uri: vendorData.image as string }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Header Buttons Overlay */}
          <View className="absolute top-12 left-0 right-0 flex-row justify-between px-4 z-10">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-black/50 rounded-full items-center justify-center backdrop-blur-md"
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-black/50 rounded-full items-center justify-center backdrop-blur-md">
              <Ionicons name="share-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
        </View>

        {/* === 2. VENDOR INFO === */}
        <View className="px-5 pt-4">
          <Text className="text-white text-3xl font-bold mb-1">{vendorData.name}</Text>
          
          <View className="flex-row items-center mb-4">
            <Text className="text-primary font-semibold mr-2">Clean Certified</Text>
            <Ionicons name="star" size={14} color="#00C896" />
            <Text className="text-gray-400 ml-1">{vendorData.rating?.toFixed(1) || 'N/A'}</Text>
          </View>

          {/* Description now fetched from Firestore */}
          <Text className="text-gray-400 leading-6 mb-8">
            {vendorData.description || "No detailed description provided by vendor."}
          </Text>

          <View className="h-[1px] bg-gray-800 w-full mb-8" />

          {/* === 3. MENU SECTION (Fetched from Firestore) === */}
          <Text className="text-white text-xl font-bold mb-4">Menu</Text>
          <View className="mb-8">
            {(vendorData.menu as any[] || []).map((item, index) => (
              <View key={index} className="flex-row items-start mb-6">
                {/* Text Side */}
                <View className="flex-1 pr-4">
                  <Text className="text-primary font-bold text-lg mb-1">{item.price}</Text>
                  <Text className="text-white font-bold text-lg mb-1">{item.name}</Text>
                </View>
                {/* Image Side */}
                <Image 
                  source={{ uri: item.image || DEFAULT_MENU_ITEM_IMAGE }} 
                  className="w-28 h-24 rounded-xl bg-gray-800"
                  resizeMode="cover"
                />
              </View>
            ))}
            {vendorData.menu.length === 0 && (
                <Text className="text-gray-500 text-center">Menu coming soon!</Text>
            )}
          </View>

          <View className="h-[1px] bg-gray-800 w-full mb-8" />

          {/* === 4. REVIEWS SECTION (Fetched from Firestore Subcollection) === */}
          <Text className="text-white text-xl font-bold mb-6">Reviews ({reviews.length})</Text>
          
          {/* Review Input Component */}
          <ReviewInput onSubmit={handleReviewSubmit} />
          
          <View className="h-[1px] bg-gray-800 w-full my-6" />

          {(reviews as any[]).map((review) => (
            <View key={review.id} className="mb-8">
              {/* Review Header (Using generic anonymous icon) */}
              <View className="flex-row items-center mb-2">
                <Ionicons name="person-circle" size={40} color="#A1A1AA" />
                <View className="ml-3">
                  <Text className="text-white font-bold">Anonymous User</Text>
                  <Text className="text-gray-500 text-xs">{new Date(review.timestamp?.toDate()).toLocaleDateString() || 'Just now'}</Text>
                </View>
              </View>
              
              {/* Stars */}
              <View className="flex-row mb-2">
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i} 
                    name="star" 
                    size={14} 
                    color={i < review.rating ? "#00C896" : "#333"} 
                  />
                ))}
              </View>

              {/* Text */}
              <Text className="text-gray-300 leading-5 mb-3">{review.text}</Text>

              {/* Likes (Static for now) */}
              <View className="flex-row items-center space-x-4">
                <View className="flex-row items-center mr-4">
                   <Ionicons name="thumbs-up-outline" size={16} color="#A1A1AA" />
                   <Text className="text-gray-400 text-xs ml-1">{review.likes || 0}</Text>
                </View>
                <View className="flex-row items-center">
                   <Ionicons name="thumbs-down-outline" size={16} color="#A1A1AA" />
                   <Text className="text-gray-400 text-xs ml-1">{review.dislikes || 0}</Text>
                </View>
              </View>
            </View>
          ))}
          {reviews.length === 0 && (
              <Text className="text-gray-500 text-center mb-8">No reviews yet. Be the first!</Text>
          )}

          {/* === 5. LOCATION MAP (Coordinates Fixed) === */}
          <Text className="text-white text-xl font-bold mb-4">Location</Text>
          <View className="h-48 w-full rounded-2xl overflow-hidden border border-gray-800 mb-20 bg-gray-800">
            <MapView
              style={{ width: '100%', height: '100%' }}
              // Use fetched coordinates from Firestore
              initialRegion={{
                latitude: vendorData.lat, 
                longitude: vendorData.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              liteMode={true} 
            >
              <Marker 
                coordinate={{ latitude: vendorData.lat, longitude: vendorData.lng }}
                pinColor="#00C896"
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}