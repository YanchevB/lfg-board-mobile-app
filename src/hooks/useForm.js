import { useState } from 'react';

// validate(formData) returns { field: 'message' }, onSubmit can return the same shape for server-side field errors
export default function useForm(initialValues, validate, onSubmit) {
    const [formData, setFormData] = useState(initialValues);

    const [error, setError] = useState(null);
    const [fieldError, setFieldError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function changeHandler(name, value) {
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function reset() {
        setFormData(initialValues);
        setFieldError({});
        setError(null);
    }

    async function submitHandler() {
        setError(null);

        const formErrors = validate(formData);
        setFieldError(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            const submitErrors = await onSubmit(formData, reset);

            if (submitErrors) {
                setFieldError(submitErrors);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return { formData, error, fieldError, isSubmitting, changeHandler, submitHandler };
}
