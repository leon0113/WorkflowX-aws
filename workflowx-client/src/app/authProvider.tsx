import React from "react";
import { Authenticator, Button, Heading, Text, useAuthenticator, useTheme, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId:
                process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        }
    }
});

const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <div className="flex justify-center mt-20">
                    <Image
                        alt="Amplify logo"
                        src="https://docs.amplify.aws/assets/logo-dark.svg"
                    />
                </div>
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    <footer className="bg-gray-800 text-white py-4">
                        <div className="container mx-auto text-center">
                            <p className="text-sm">
                                Powered by <span className="text-yellow-500">AWS Cognito and Amplify</span>
                            </p>
                            <p className="text-xs mt-2 text-gray-400">
                                © 2025 <span className="text-white">Leon0113</span>. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </Text>
            </View>
        );
    },
}

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: "Choose a username",
            label: "Username",
            inputProps: { required: true },
        },
        email: {
            order: 1,
            placeholder: "Enter your email address",
            label: "Email",
            inputProps: { type: "email", required: true },
        },
        password: {
            order: 3,
            placeholder: "Enter your password",
            label: "Password",
            inputProps: { type: "password", required: true },
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            inputProps: { type: "password", required: true },
        },
    },
};

const AuthProvider = ({ children }: any) => {
    return (
        <div>
            <Authenticator formFields={formFields} components={components}>
                {({ user }: any) =>
                    user ? (
                        <div>{children}</div>
                    ) : (
                        <div>
                            <h1>Please sign in below:</h1>
                        </div>
                    )
                }
            </Authenticator>
        </div>
    );
};

export default AuthProvider;