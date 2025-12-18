import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { accessibilityStyles } from "@/styles/customAlert";

interface AccessibleAlertButton {
  text: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface AccessibleAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: AccessibleAlertButton[];
  onClose: () => void;
}

export const AccessibleAlert: React.FC<AccessibleAlertProps> = ({
  visible,
  title,
  message,
  buttons,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={accessibilityStyles.overlay} onPress={onClose}>
        <Pressable
          style={accessibilityStyles.alertContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={accessibilityStyles.title}>{title}</Text>
          <Text style={accessibilityStyles.message}>{message}</Text>

          <View style={accessibilityStyles.buttonContainer}>
            {buttons.map((button, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  accessibilityStyles.button,
                  button.style === "destructive" &&
                    accessibilityStyles.destructiveButton,
                  button.style === "cancel" && accessibilityStyles.cancelButton,
                  pressed && accessibilityStyles.buttonPressed,
                ]}
                onPress={() => {
                  button.onPress();
                  onClose();
                }}
              >
                <Text
                  style={[
                    accessibilityStyles.buttonText,
                    button.style === "destructive" &&
                      accessibilityStyles.destructiveText,
                    button.style === "cancel" && accessibilityStyles.cancelText,
                  ]}
                >
                  {button.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
