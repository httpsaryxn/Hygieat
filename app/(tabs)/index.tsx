import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import Router
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import VendorCard from '../../src/components/VendorCard';
import { db } from '../../src/services/firebaseConfig';

// 1. Define Default Data (The "Safety Net")
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070";

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('Nearby');
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter(); // Initialize Navigation

  const filters = ['Nearby', 'Top Rated', 'Certified Safe', 'Veg Only'];

  // 2. Fetch Data (Realtime Listener)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'vendors'), (snapshot) => {
      const liveData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVendors(liveData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching vendors:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View className="flex-1 p-4">
        {/* === HEADER === */}
        <View className="flex-row justify-between items-center mb-6 mt-2">
          <View>
            <Text className="text-gray-400 text-xs uppercase tracking-widest">Current Location</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location" size={20} color="#00C896" />
              <Text className="text-white text-xl font-bold ml-1">Mumbai, India</Text>
              <Ionicons name="chevron-down" size={16} color="#00C896" className="ml-1" />
            </View>
          </View>
          <View className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center border border-gray-700">
             <Ionicons name="person" size={20} color="#FFF" />
          </View>
        </View>

        {/* === SEARCH BAR === */}
        <View className="flex-row items-center bg-dark-card rounded-xl px-4 py-3 mb-6 border border-gray-800">
          <Ionicons name="search" size={20} color="#A1A1AA" />
          <TextInput 
            placeholder="Search hygienic street food..." 
            placeholderTextColor="#666"
            className="flex-1 ml-3 text-white font-medium"
          />
        </View>

        {/* === FILTER CHIPS === */}
        <View className="h-10 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity 
                key={filter} 
                onPress={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full mr-3 border ${
                  activeFilter === filter 
                    ? 'bg-primary border-primary' 
                    : 'bg-transparent border-gray-700'
                }`}
              >
                <Text className={`font-semibold ${
                  activeFilter === filter ? 'text-black' : 'text-gray-400'
                }`}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* === VENDOR LIST === */}
        <Text className="text-white text-lg font-bold mb-4">Recommended Vendors</Text>
        
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#00C896" />
            <Text className="text-gray-500 mt-4">Finding hygienic spots...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
            {vendors.map((item) => {
              // 3. MERGE LOGIC: Real Data overwrites Default Data
              const finalVendor = {
                id: item.id,
                name: item.name || "Unknown Stall",
                image: item.image || DEFAULT_IMAGE,
                rating: item.rating || 4.0,
                distance: item.distance || "1.2 km",
                hygieneGrade: item.hygieneGrade || "B"
              };

              return (
                <VendorCard 
                  key={finalVendor.id} 
                  vendor={finalVendor}
                  // 4. NAVIGATION LOGIC ADDED HERE
                  // ... inside the onPress function
onPress={() => {
  router.push({
    // Add "as any" here to silence the error
    pathname: "/vendor/[id]" as any, 
    params: { 
      id: finalVendor.id,
      name: finalVendor.name,
      image: finalVendor.image,
      rating: finalVendor.rating,
      hygieneGrade: finalVendor.hygieneGrade,
      distance: finalVendor.distance
    }
  });
}}
                />
              );
            })}
            
            {/* Empty State */}
            {vendors.length === 0 && (
              <Text className="text-gray-600 text-center mt-10">
                No vendors found nearby.
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}