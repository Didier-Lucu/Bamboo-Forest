import { Box, Button, Heading, Center, Input, FormControl, FormLabel, FormErrorMessage, Text, Link } from '@chakra-ui/react';
import { DASHBOARD, LOGIN } from 'lib/router';
import { Link as RouterLink } from 'react-router-dom';
import { useRegister } from 'hooks/Auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate, usernameValidate } from 'utils/form-validate';

export default function Register() {
    const { register: signUp, isLoading } = useRegister();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    console.log(errors)

    async function handleRegister(data) {
        const success = await signUp({ username: data.username, email: data.email, password: data.password, redirectTo: DASHBOARD });

        if (success) {
            reset();
        }
    }

    return <Center w="100%" h="100vh" >
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
            <Heading mb="4" size="lg" textAlign="center">Sign Up
            </Heading>
            <form onSubmit={handleSubmit(handleRegister)}>
                <FormControl isInvalid={errors.username} py="2">
                    <FormLabel>Username</FormLabel>
                    <Input placeholder="username" {...register('username', usernameValidate)} />
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email} py="2">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Email" {...register('email', emailValidate)} />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password} py="2">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Password" {...register('password', passwordValidate)} />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Button mt="4" type="submit" colorScheme="blue" size="md" width="full" isLoading={isLoading} loadingText="Welcome!" > Sign Up! </Button>
            </form>
            <Text mt="4" textAlign="center">Already have an account? <Link as={RouterLink} to={LOGIN} color="teal.500">Login</Link></Text>


        </Box></Center >;
}
