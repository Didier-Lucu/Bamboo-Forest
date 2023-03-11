import { Box, Button, Heading, Center, Input, FormControl, FormLabel, FormErrorMessage, Text, Link } from '@chakra-ui/react';
import { DASHBOARD, REGISTER } from 'lib/router';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin, useSocialLogin } from 'hooks/Auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from 'utils/form-validate';
import { FcGoogle } from 'react-icons/fc';


export default function Login() {
    const { login, isLoading } = useLogin();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    console.log(errors)

    async function handleLogin(data) {
        const success = await login({ email: data.email, password: data.password, redirectTo: DASHBOARD });

        if (success) {
            reset();
        }
    }

    const { socialLogin } = useSocialLogin(); // get socialLogin function from hook

    async function handleSocialLogin(providerType) {
        const success = await socialLogin({ redirectTo: DASHBOARD, providerType: providerType });

        if (success) {
            reset();
        }
    }

    return <Center w="100%" h="100vh" >
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
            <Heading mb="4" size="lg" textAlign="center">Login
            </Heading>
            <form onSubmit={handleSubmit(handleLogin)}>
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
                <Button mt="4" type="submit" colorScheme="blue" size="md" width="full" isLoading={isLoading} loadingText="Welcome!" > Login </Button>
            </form>
            <Button
                w={'full'}
                maxW={'md'}
                mt={2}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={() => handleSocialLogin('google')}
            >
                <Center>
                    <Text>Sign in with Google</Text>
                </Center>
            </Button>

            <Text align="center">
                Don't have an account?{" "}
                <Link as={RouterLink} to={REGISTER} color="blue.400" fontWeight="medium" textDecor="underline" _hover={{ background: "cyan.100" }} >Register</Link>
            </Text>


        </Box></Center >;
}
