import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUser } from '@/hooks/use-user';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const systemColorScheme = useColorScheme();
  const { profileIcon, setProfileIcon, theme, setTheme } = useUser();
  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const icons = ['person-circle', 'person', 'happy', 'star', 'heart'];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      <ScrollView className="flex-1 p-4 pt-16" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Profile Icon Selector */}
        <View className="items-center mb-8 mt-4">
          <View className={`w-24 h-24 rounded-full items-center justify-center border-2 ${isDark ? 'border-primary bg-dark-card' : 'border-primary bg-gray-100'}`}>
            <Ionicons name={profileIcon as any} size={60} color="#00C896" />
          </View>
          <Text className={`mt-4 font-bold text-lg ${isDark ? 'text-white' : 'text-black'}`}>Select Profile Icon</Text>
          <View className="flex-row mt-3 space-x-4">
            {icons.map((icon) => (
              <TouchableOpacity
                key={icon}
                onPress={() => setProfileIcon(icon)}
                className={`p-2 rounded-full ${profileIcon === icon ? 'bg-primary' : (isDark ? 'bg-gray-800' : 'bg-gray-200')}`}
              >
                <Ionicons name={icon as any} size={24} color={profileIcon === icon ? 'black' : (isDark ? '#A1A1AA' : '#666')} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* User Details */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>User Details</Text>
          <View className="mb-3">
            <Text className="text-xs uppercase tracking-widest text-gray-500">Name</Text>
            <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>John Doe</Text>
          </View>
          <View className="mb-3">
            <Text className="text-xs uppercase tracking-widest text-gray-500">Email</Text>
            <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>john.doe@email.com</Text>
          </View>
          <View>
            <Text className="text-xs uppercase tracking-widest text-gray-500">Phone</Text>
            <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>+1 234 567 8901</Text>
          </View>
        </View>

        {/* Light/Dark Mode Toggle */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <View className="flex-row justify-between items-center">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>Appearance</Text>
            <View className="flex-row items-center">
              <Text className={`mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{isDark ? 'Dark' : 'Light'} Mode</Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                thumbColor={isDark ? '#00C896' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#004d3a' }}
              />
            </View>
          </View>
        </View>

        {/* Saved Addresses */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Saved Addresses</Text>
          <View className="mb-3 flex-row items-center">
            <Ionicons name="home-outline" size={20} color="#00C896" style={{ marginRight: 12 }} />
            <View>
              <Text className="text-xs uppercase tracking-widest text-gray-500">Home</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>123 Main St, Mumbai, India</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="briefcase-outline" size={20} color="#00C896" style={{ marginRight: 12 }} />
            <View>
              <Text className="text-xs uppercase tracking-widest text-gray-500">Work</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>456 Office Park, Navi Mumbai, India</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Payment Methods</Text>
          <View className="mb-3 flex-row items-center">
            <Ionicons name="card-outline" size={20} color="#00C896" style={{ marginRight: 12 }} />
            <View>
              <Text className="text-xs uppercase tracking-widest text-gray-500">UPI</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>john.doe@upi</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="card-outline" size={20} color="#00C896" style={{ marginRight: 12 }} />
            <View>
              <Text className="text-xs uppercase tracking-widest text-gray-500">Credit Card</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>**** **** **** 1234</Text>
            </View>
          </View>
        </View>

        {/* Hygiene Preferences */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Hygiene Preferences</Text>
          <View className="mb-3">
            <Text className="text-xs uppercase tracking-widest text-gray-500">Preferred Grade</Text>
            <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>A</Text>
          </View>
          <View>
            <Text className="text-xs uppercase tracking-widest text-gray-500">Dietary</Text>
            <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>Vegetarian</Text>
          </View>
        </View>

        {/* Rewards / Points */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>Rewards / Points</Text>
            <View className="bg-primary/20 px-3 py-1 rounded-full">
              <Text className="text-primary font-bold">Gold Tier</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="trophy-outline" size={24} color="#00C896" style={{ marginRight: 12 }} />
            <View>
              <Text className="text-xs uppercase tracking-widest text-gray-500">Total Points</Text>
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>320 pts</Text>
            </View>
          </View>
        </View>

        {/* Help & Support */}
        <View className={`p-4 rounded-2xl mb-6 border ${isDark ? 'bg-dark-card border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Help & Support</Text>
          <TouchableOpacity className="mb-3 flex-row items-center">
            <Ionicons name="mail-outline" size={20} color="#00C896" style={{ marginRight: 12 }} />
            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>support@hygieat.com</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="call-outline" size={20} color="#00C896" style={{ marginRight: 12 }} />
            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>1800-123-4567</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
