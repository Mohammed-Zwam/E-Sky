import React, { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import Modal from "react-native-modal";
import { CardField, confirmPayment } from "@stripe/stripe-react-native";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';


const { width } = Dimensions.get("window");

const CheckoutModel = ({ isVisible, setIsVisible, totalPrice, setCartProducts }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [step, setStep] = useState('methods');
    const [cardDetails, setCardDetails] = useState(null);
    const [email, setEmail] = useState('');
    const [loading, setIsLoading] = useState(false);
    const cardFieldRef = useRef(null);

    const paymentMethods = [
        {
            id: 'card',
            name: 'Credit/Debit Card',
            description: 'Visa, Mastercard, American Express',
            icon: <FontAwesome5 name="credit-card" size={25} color={"#fff"} />,
            fees: 'Fee: 2.9% + 30¢'
        },
        {
            id: 'apple_pay',
            name: 'Apple Pay',
            description: 'Fast and secure payment',
            icon: <FontAwesome5 name="apple-pay" size={35} color={"#fff"} />,
            fees: 'No additional fees'
        },
        {
            id: 'google_pay',
            name: 'Google Pay',
            description: 'Fast payment with Google',
            icon: <FontAwesome5 name="google-pay" size={35} color={"#fff"} />,
            fees: 'No additional fees'
        },
        {
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Direct transfer from bank',
            icon: <FontAwesome5 name="university" size={25} color={"#fff"} />,
            fees: 'Fee: 0.8%'
        },
    ];

    const handleMethodSelect = (methodId) => {
        setSelectedMethod(methodId);
        if (methodId === 'card') {
            setStep('payment');
        } else {
            handleAlternativePayment(methodId);
        }
    };

    const handleAlternativePayment = async (methodId) => {
        try {
            switch (methodId) {
                case 'apple_pay':
                    Alert.alert('Apple Pay', 'Apple Pay will be available soon');
                    break;
                case 'google_pay':
                    Alert.alert('Google Pay', 'Google Pay will be available soon');
                    break;
                case 'bank_transfer':
                    Alert.alert('Bank Transfer', 'You will be redirected for bank transfer');
                    break;
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleCardPayment = async () => {
        setIsLoading(true);
        if (!cardDetails?.complete || !email) {
            Alert.alert('Error', 'Please complete payment details');
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch('https://e-sky-server.vercel.app/api/payment/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPrice * 100 // by cent
                })
            });

            const paymentData = await response.json();

            const { paymentIntent, error } = await confirmPayment(paymentData.clientSecret, {
                paymentMethodType: "Card",
                billingDetails: { email },
            });

            if (error) {
                handleError();
                Alert.alert("Payment failed", error.message);
            } else if (paymentIntent) {
                setCartProducts([]);
                closeModal();
                Alert.alert("✅ Payment Successful", `Your payment was completed`);
            }

        } catch (_err) {
            handleError();
        }
    };

    const goBackToMethods = () => {
        setStep('methods');
        setSelectedMethod(null);
    };

    const handleError = () => {
        Alert.alert('Unexpected Error', 'Please try again');
        setCardDetails(null);
        setEmail('');
        cardFieldRef.current?.clear();
        setIsLoading(false);
    }

    const closeModal = () => {
        setIsVisible(false);
        setStep('methods');
        setSelectedMethod(null);
        cardFieldRef.current?.clear();
        setIsLoading(false);
    };


    const renderPaymentMethod = (method) => (
        <TouchableOpacity
            key={method.id}
            style={[
                styles.paymentMethod,
                selectedMethod === method.id && styles.selectedMethod
            ]}
            onPress={() => handleMethodSelect(method.id)}
        >
            <View style={styles.methodContent}>
                <View style={{ width: 60 }}>{method.icon}</View>
                <View style={styles.methodInfo}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    <Text style={styles.methodDescription}>{method.description}</Text>
                    <Text style={styles.methodFees}>{method.fees}</Text>
                </View>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={25} color="#aaa" />
        </TouchableOpacity>
    );
    const renderMethodsStep = () => (
        <>
            <Text style={styles.title}>Choose Payment Method</Text>
            <View style={styles.methodsList}>
                {paymentMethods.map(renderPaymentMethod)}
            </View>
        </>
    );
    const renderPaymentStep = () => (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBackToMethods} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={26} color="#aaa" />
                </TouchableOpacity>
                <Text style={styles.title}>Pay by Card</Text>
            </View>

            <View style={styles.emailContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder="example@email.com"
                    placeholderTextColor="#aaaaaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <Text style={styles.label}>Card Details</Text>
            <View style={styles.cardContainer}>
                <CardField
                    ref={cardFieldRef}
                    postalCodeEnabled={true}
                    placeholders={{
                        number: 'Card Number',
                        expiration: 'MM/YY',
                        cvc: 'CVC',
                        postalCode: '12345'
                    }}
                    cardStyle={{
                        backgroundColor: '#1a1a1a',
                        textColor: '#ffffff',
                        placeholderColor: '#aaaaaa',
                        borderWidth: 0,
                        fontSize: 16,
                    }}
                    style={styles.cardField}
                    onCardChange={(details) => {
                        setCardDetails(details);
                    }}
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.payButton,
                    (!cardDetails?.complete || !email || loading) && styles.payButtonDisabled
                ]}
                onPress={handleCardPayment}
                disabled={!cardDetails?.complete || !email || loading}
            >
                <Text style={styles.payButtonText}>
                    {loading ? "Processing..." : `Pay $${totalPrice}`}
                </Text>
            </TouchableOpacity>

        </View>
    );

    return (
        <Modal
            isVisible={isVisible}
            onSwipeComplete={closeModal}
            swipeDirection="down"
            style={{ width: width, margin: 0, zIndex: 10 }}
            onBackdropPress={closeModal}
        >
            <View style={styles.modal}>
                <View style={styles.dragIndicator}></View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {step === 'methods' ? renderMethodsStep() : renderPaymentStep()}
                </ScrollView>
            </View>
        </Modal>
    );
}
export default CheckoutModel;


const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#000000d8",
        height: 550,
        margin: 0,
        width: '100%',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        paddingBottom: 0
    },
    dragIndicator: {
        width: 40,
        borderRadius: 3,
        height: 4,
        backgroundColor: '#666',
        alignSelf: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaaaaa',
        textAlign: 'center',
        marginBottom: 30,
    },
    methodsList: {
        marginBottom: 20,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#2a2a2a',
    },
    selectedMethod: {
        borderColor: '#007AFF',
        backgroundColor: '#1a2332',
    },
    methodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        fontSize: 28,
        marginRight: 15,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 2,
    },
    methodDescription: {
        fontSize: 12,
        color: '#aaaaaa',
        marginBottom: 2,
    },
    methodFees: {
        fontSize: 11,
        color: '#888888',
    },
    arrow: {
        padding: 5,
    },
    arrowText: {
        fontSize: 16,
        color: '#666666',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        paddingRight: 10,
        marginTop: -8
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
    label: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 8,
        fontWeight: '500',
    },
    emailContainer: {
        marginBottom: 20,
    },
    emailInput: {
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#444444',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#ffffff',
    },
    cardContainer: {
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#444444',
        borderRadius: 8,
        padding: 5,
        marginBottom: 20,
    },
    cardField: {
        width: '100%',
        height: 50,
    },
    payButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    payButtonDisabled: {
        backgroundColor: '#444444',
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    securityNote: {
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        marginTop: 10,
    }
});