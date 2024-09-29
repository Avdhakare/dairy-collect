import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons'; // For icons, ensure expo vector icons are installed.

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-gray-100 p-6">
      <View className="bg-white p-6 rounded-2xl shadow-md">
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: 'https://example.com/profile-pic.jpg' }} // Replace with your profile image URL
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold">Amélie Laurent</Text>
            <Text className="text-gray-500">amelie@untitledui.com</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity className="px-4 py-2 border rounded-lg border-gray-300">
              <Text className="text-sm font-medium">Copy link</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 border rounded-lg border-gray-300">
              <Text className="text-sm font-medium">View profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Name */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-600">Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mt-1"
                placeholder="First name"
                defaultValue="Amélie"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-600"> </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mt-1"
                placeholder="Last name"
                defaultValue="Laurent"
              />
            </View>
          </View>

          {/* Email address */}
          <View>
            <Text className="text-sm text-gray-600">Email address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mt-1"
              placeholder="Email address"
              defaultValue="amelie@untitledui.com"
            />
          </View>

          {/* Username */}
          <View>
            <Text className="text-sm text-gray-600">Username</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg p-3 mt-1">
              <Text className="text-gray-500">untitledui.com/</Text>
              <TextInput
                className="flex-1"
                placeholder="Username"
                defaultValue="amelie"
              />
              <Ionicons name="checkmark-circle" size={20} color="blue" />
            </View>
          </View>

          {/* Profile photo */}
          <View>
            <Text className="text-sm text-gray-600">Profile photo</Text>
            <TouchableOpacity className="border border-gray-300 rounded-lg p-3 mt-1 flex-row items-center">
              <Image
                source={{ uri: 'https://example.com/profile-pic.jpg' }} // Replace with your profile image URL
                className="w-10 h-10 rounded-full mr-4"
              />
              <Text className="text-gray-500">Click to replace</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Buttons */}
        <View className="flex-row mt-6 space-x-4">
          <TouchableOpacity className="flex-1 p-3 bg-red-100 rounded-lg items-center justify-center">
            <Text className="text-red-500">Delete user</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-3 bg-gray-200 rounded-lg items-center justify-center">
            <Text className="text-gray-500">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-3 bg-black rounded-lg items-center justify-center">
            <Text className="text-white">Save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
