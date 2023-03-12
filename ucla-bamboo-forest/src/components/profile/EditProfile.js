import {
  Button,
  Text,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "hooks/Auth";
import { useUpdateAvatar, useUpdateUser } from "hooks/users";
import Avatar from "./Avatar";

export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id);
  const {
    setUsername,
    updateUsername,
    isLoading: usernameLoading,
  } = useUpdateUser(user?.id);
  const [timeLeft, setTimeLeft] = useState(0);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function handleUpdateUsername() {
    if (timeLeft === 0) {
      updateUsername();
      setTimeLeft(60);
    }
  }

  if (authLoading) return "Loading...";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing="5">
            <Avatar user={user} overrideAvatar={fileURL} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Change avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>
          <Button
            loadingText="Uploading"
            w="full"
            my="2"
            colorScheme="blue"
            onClick={() => updateAvatar()}
            isLoading={fileLoading}
          >
            Save Profile Photo
          </Button>
          <Text fontSize="md" fontWeight="semibold" align="center" my={"2.5"}>
            OR
          </Text>
          <FormControl mt="6">
            <FormLabel>Change username</FormLabel>
            <Input
              placeholder="New username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <Button
            loadingText="Saving"
            w="full"
            my="2"
            colorScheme="blue"
            onClick={handleUpdateUsername}
            isLoading={usernameLoading}
            disabled={timeLeft !== 0}
          >
            {timeLeft !== 0
              ? `${timeLeft} seconds left to change your username again`
              : "Save Username"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
