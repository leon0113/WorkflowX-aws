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
                <Image
                    alt="Amplify logo"
                    src="https://docs.amplify.aws/assets/logo-dark.svg"
                />
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; All Rights Reserved
                </Text>
            </View>
        );
    },

    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Sign in to your account
                </Heading>
            );
        },
        Footer() {
            const { toForgotPassword } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                    >
                        Reset Password
                    </Button>
                </View>
            );
        },
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Create a new account
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Back to Sign In
                    </Button>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
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
                        <div className="flex justify-center items-center h-screen bg-slate-600">
                            <h1>Please sign in below:</h1>
                        </div>
                    )
                }
            </Authenticator>
        </div>
    );
};

export default AuthProvider;