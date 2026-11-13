export default function registerValidate(formData) {
    const errors = {};
    const username = formData.username.trim();

    if (!username) {
        errors.username = 'Username is required';
    } else if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) errors.email = 'Email is required';

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) errors.confirmPassword = "Passwords don't match";

    return errors;
}
