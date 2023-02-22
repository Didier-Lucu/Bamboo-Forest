import { Box, Button, Heading, Center, Input, FormControl, FormLabel, FormErrorMessage, Text, Link } from '@chakra-ui/react';
import { DASHBOARD, REGISTER } from 'lib/router';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from 'hooks/Auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from 'utils/form-validate';

export default function Login() {
    const { login, isLoading } = useLogin();
    const { register, handleSubmit, reset } = useForm()

    async function handleLogin(data) {
        await login({ email: data.email, password: data.password, redirectTo: DASHBOARD });

        reset();
    }

    return <Center w="100%" h="100vh" >
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
            <Heading mb="4" size="lg" textAlign="center">Login
            </Heading>
            <form onSubmit={handleSubmit(handleLogin)}>
                <FormControl isInvalid={true} py="2">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Email" {...register('email', emailValidate)} />
                    <FormErrorMessage>Email Error Message</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={true} py="2">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Password" {...register('password', passwordValidate)} />
                    <FormErrorMessage>PSW Error Message</FormErrorMessage>
                </FormControl>
                <Button mt="4" type="submit" colorScheme="blue" size="md" width="full" isLoading={false} loadingText="Welcome!" > Login </Button>
            </form>
            <Text align="center">
                Don't have an account?{" "}
                <Link as={RouterLink} to={REGISTER} color="blue.400" fontWeight="medium" textDecor="underline" _hover={{ background: "cyan.100" }} >Register</Link>
            </Text>


        </Box></Center >;
}
