import { useAuth } from "@/context/AuthContext";
import { buttonStyles, inputStyles } from "@/styles/commonStyles";
import { loginStyles } from "@/styles/login";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login, signup, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Starts loading

    try {
      let result;

      if (isLoginMode) {
        result = await login(email, password);
      } else {
        result = await signup(email, password, username);
      }

      if (result.success) {
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Error",
          result.error || "Authentication failed. Please try again."
        );
      }
    } catch (error) {
      console.log("Submit error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Ends loading
    }
  };
  return (
    <KeyboardAvoidingView
      style={loginStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={loginStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginStyles.headerSection}>
          <View style={loginStyles.logoContainer}>
            <Text style={loginStyles.logoText}>🍳</Text>
          </View>
          <Text style={loginStyles.title}>Recipe Box</Text>
          <Text style={loginStyles.subtitle}>
            Discover and save your favourite recipes
          </Text>
        </View>
        <View style={loginStyles.formSection}>
          <Text style={loginStyles.formTitle}>
            {isLoginMode ? "Welcome Back!" : "Create an account!"}
          </Text>
          {!isLoginMode && (
            <View style={inputStyles.inputContainer}>
              <Text style={inputStyles.inputLabel}>Username</Text>
              <TextInput
                style={inputStyles.input}
                placeholder="Enter your username."
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          )}
          <View style={inputStyles.inputContainer}>
            <Text style={inputStyles.inputLabel}>Email</Text>
            <TextInput
              style={inputStyles.input}
              placeholder="Enter your email."
              value={email}
              onChangeText={setEmail}
              keyboardType={"email-address"}
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>
          <View style={inputStyles.inputContainer}>
            <Text style={inputStyles.inputLabel}>Password</Text>
            <TextInput
              style={inputStyles.input}
              placeholder="Enter your password."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />
          </View>
          <TouchableOpacity
            style={[
              buttonStyles.submitButton,
              isSubmitting && buttonStyles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={buttonStyles.buttonText}>
                {isLoginMode ? "Login" : "Sign Up"}
              </Text>
            )}
          </TouchableOpacity>
          <View style={loginStyles.toggleContainer}>
            <Text style={loginStyles.toggleText}>
              {isLoginMode
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
              <Text style={loginStyles.toggleLink}>
                {isLoginMode ? "Sign Up" : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
