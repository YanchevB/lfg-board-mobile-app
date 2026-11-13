export default function loginValidate(formData) {
    const errors = {};

    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';

    return errors;
}
