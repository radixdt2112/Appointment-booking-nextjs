import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginSchema = Yup.object({
    email: Yup.string().email().required('Please Enter your email'),
    password: Yup.string().required('Please Enter your password'),
});

export const registerSchema = Yup.object({
    firstName: Yup.string().min(3, 'first name must be 3 character long').required('Please enter First name'),
    lastName: Yup.string().min(3, 'last name must be 3 character long').required('Please enter Last name'),
    email: Yup.string().email().required('Please Enter your email'),
    password: Yup.string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    gender: Yup.string().default('Male'),
    contactNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'to short').max(10, 'to long').required('Required')
});