type SignUpValidationProps = {
  email?: string;
  password?: string;
};

export default function SignUpValidation({ email, password }: SignUpValidationProps) {
  const errors: SignUpValidationProps = {};
  if (!email) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = '올바른 이메일을 입력해주세요.';
  }
  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (password.length <= 8 || password.length >= 20) {
    errors.password = '올바른 비밀번호를 입력해주세요.';
  }
  return errors;
}
