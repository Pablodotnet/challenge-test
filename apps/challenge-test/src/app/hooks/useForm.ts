import { useEffect, useMemo, useState } from 'react';

type OnInputChangeType = {
  target: { name: string; value: string };
};

export type AuthFormType = {
  email: string;
  password: string;
  displayName?: string;
  formState: { email: string; password: string; displayName?: string };
  onInputChange: ({ target }: OnInputChangeType) => void;
  onResetForm: () => void;
  isFormValid?: boolean;
  displayNameValid?: boolean;
  emailValid?: boolean;
  passwordValid?: boolean;
};

export const useForm = (
  initialForm = { email: '', password: '' },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValidations: any = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      // @ts-expect-error - Check later
      if (formValidation[formValue] !== null) {
        return false;
      }
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValidation]);

  const onInputChange = ({ target }: OnInputChangeType) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      // @ts-expect-error - Check later
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
  };
};
