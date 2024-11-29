import { Text, TextInput, View, StyleSheet } from "react-native";
import React from "react";

//firebase
import { logIn } from "../services/firebase";

//hooks and utils
import * as Yup from "yup";
import { Link, router } from "expo-router";
import { Loader } from "../components/Loading";
import Button from "../components/Button";
import { Formik } from "formik";
import { ThemedText } from "../components/ThemedText";
import ThemedInput from "../components/ThemedInput";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email cannot be empty"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleLogin = async (
    values: typeof initialValues,
    { setErrors, setSubmitting }: any
  ) => {
    try {
      const { email, password } = values;
      await logIn({ email, password });
      router.replace('/(tabs)');
      console.log("User Logged in");
    } catch (error: any) {
      //handle firebase errors
      if (error.code === "auth/invalid-email") {
        setErrors({ email: "Invalid email address" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "Incorrect password" });
      } else if (error.code === "auth/user-not-found") {
        setErrors({ email: "User not found" });
      } else if (error.code === "auth/invalid-credential") {
        setErrors({ email: "Invalid Credentials" });
      } else {
        setErrors({ general: "Failed to log in" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title">Log in to your account</ThemedText>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
              {touched.email && errors.email && (
                <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
              )}
              <ThemedInput
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
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
                  title={isSubmitting ? <Loader /> : "Login"}
                  onPress={handleSubmit}
                />
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ThemedText>
                    Dont have an account?
                    <Link href="/screens/signup">
                      <Text style={styles.loginLink}>&nbsp;Sign up</Text>
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
  loginLink: {
    color: "#ff7b00",
    fontWeight: "900",
    fontSize: 18,
  },
  errorText: {
    color: "#ff1e00",
    fontWeight: "600",
  },
});

export default Login;
