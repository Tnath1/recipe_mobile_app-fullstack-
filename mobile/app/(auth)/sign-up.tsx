import {
  View,
  Alert,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
// import VerifyEmail from "./verify_email";

const SignUpScreen = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShouwPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (Number(password) < 8) {
      Alert.alert("Error", "Password must be atleast 8 characters");
      return;
    }

    if (!isLoaded) return;
    setLoading(true);

    // console.log("email", email);
    // console.log(password);
    // return;
    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("signUp.id", signUp?.id);
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Failed to create an account"
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded) return;

    setLoading(true);
    const trimmedCode = code.trim();
    console.log("Entered code:", trimmedCode, "length:", trimmedCode.length);

    console.log("signUp.id", signUp?.id);
    // return;

    // try {
    //   // const signUpAttempt = await signUp.attemptEmailAddressVerification({
    //   //   code: trimmedCode,
    //   // });

    //   // if (signUpAttempt.status === "complete") {
    //   //   await setActive({ session: signUpAttempt.createdSessionId });
    //   // } else {
    //   //   Alert.alert("Error", "Verification failed, please try again.");
    //   //   console.error(JSON.stringify(signUpAttempt, null, 2));
    //   // }

    //   const signUpAttempt = await signUp.attemptEmailAddressVerification({
    //     code: trimmedCode,
    //   });

    //   // If verification was completed, set the session to active
    //   // and redirect the user
    //   if (signUpAttempt.status === "complete") {
    //     await setActive({ session: signUpAttempt.createdSessionId });
    //     router.replace("/");
    //   } else {
    //     // If the status is not complete, check why. User may need to
    //     // complete further steps.

    //     Alert.alert("Error", "Verification failed, please try again.");

    //     console.error(JSON.stringify(signUpAttempt, null, 2));
    //   }
    // } catch (err: any) {
    //   console.error("Verification Error:", JSON.stringify(err, null, 2));
    //   Alert.alert(
    //     "Error",
    //     err.errors?.[0]?.message || err.message || "Verification Failed"
    //   );
    // } finally {
    //   setLoading(false);
    // }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("status:", completeSignUp.status); 
      console.log("createdSessionId:", completeSignUp.createdSessionId);

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log("Sign up successful, session active!");
      }
    } catch (err: any) {
      console.error("Verification failed");

      // Clerk errors are usually in err.errors[]
      if (err?.errors?.length) {
        console.error("Clerk error:", err.errors[0].message);
        Alert.alert("Error", err.errors[0].message);
      } else {
        console.error("Error message:", err.message || err.toString());
        Alert.alert("Error", err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification)
    return (
      <View style={authStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={authStyles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={authStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={authStyles.imageContainer}>
              <Image
                source={require("../../assets/images/i3.png")}
                style={authStyles.image}
                contentFit="contain"
              />
            </View>
            <Text style={authStyles.title}>Verify Your Account</Text>
            <Text style={authStyles.subtitle}>
              We've have sent a Verification code to {email}
            </Text>

            {/* Form container */}
            <View style={authStyles.formContainer}>
              {/* email input */}
              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.textInput}
                  placeholder="Enter verification code"
                  placeholderTextColor={COLORS.textLight}
                  value={code}
                  // onChange={setEmail}
                  onChangeText={(text) => setCode(text)}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={[
                  authStyles.authButton,
                  loading && authStyles.buttonDisabled,
                ]}
                onPress={handleVerification}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={authStyles.buttonText}>
                  {loading ? "Verifying..." : "Verify Email"}
                </Text>
              </TouchableOpacity>

              {/* Sign up Link */}
              <TouchableOpacity
                style={authStyles.linkContainer}
                onPress={() => setPendingVerification(false)}
              >
                <Text style={authStyles.linkText}>
                  Back to sign up <Text style={authStyles.link}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );

  // if (pendingVerification)
  //   return (
  //     <VerifyEmail email={email} onBack={() => setPendingVerification(false)} />
  //   );

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i2.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

          {/* Form container */}
          <View style={authStyles.formContainer}>
            {/* email input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                // onChange={setEmail}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* password input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter passwod"
                placeholderTextColor={COLORS.textLight}
                value={password}
                // onChange={setPassword}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShouwPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                authStyles.authButton,
                loading && authStyles.buttonDisabled,
              ]}
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Sign up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.back()}
            >
              <Text style={authStyles.linkText}>
                Already have an acoount?{" "}
                <Text style={authStyles.link}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
