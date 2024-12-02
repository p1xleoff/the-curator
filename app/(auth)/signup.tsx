import { Text, TextInput, View, StyleSheet } from "react-native";
import React from "react";

//firebase

//hooks and functions
import { Formik } from "formik";
import * as Yup from "yup";

//components
import { Loader } from "../components/Loading";
import { signUp } from "../services/firebase/firebase";
import { Link, router } from "expo-router";
import { ThemedText } from "../components/ThemedText";
import ThemedInput from "../components/ThemedInput";
import Button from "../components/Button";

const Signup = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username cannot be empty")
      .min(2, "Username must be atleast  characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email cannot be empty"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSignUp = async (
    values: typeof initialValues,
    { setErrors, setSubmitting }: any
  ) => {
    try {
      const { email, password, username } = values;
      await signUp({ email, password, username });
      router.replace('/(tabs)');
      console.log("User registered");
    } catch (error: any) {
      // handle Firebase errors
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already in use" });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: "Password is too weak" });
      } else {
        setErrors({ general: "Error signing up user" });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title">Create an account</ThemedText>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View>
              {touched.username && errors.username && (
                <ThemedText style={styles.errorText}>
                  {errors.username}
                </ThemedText>
              )}
              <ThemedInput
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                placeholder="Username"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <ThemedInput
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Email"
                keyboardType="email-address"
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <ThemedInput
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="Password"
                secureTextEntry
              />
              <View style={{ marginTop: 30 }}>
                <Button
                  title={isSubmitting ? <Loader /> : "Sign Up"}
                  onPress={handleSubmit}
                />
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ThemedText>
                    Already have an account?
                    <Link href="/login">
                      <Text style={styles.signupLink}>&nbsp;Login</Text>
                    </Link>
                  </ThemedText>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  signupLink: {
    color: "#ff7b00",
    fontWeight: "600",
  },
  errorText: {
    color: "#ff1e00",
    fontWeight: "600",
  },
});

export default Signup;
