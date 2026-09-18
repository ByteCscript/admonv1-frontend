// Use Case Pattern:
// Encapsulates the authentication operation.
//
// Dependency Inversion:
// Depends on repository abstraction instead of HTTP infrastructure.
export class Login {
  constructor(authRepository) {
    // Dependency Injection:
    // Repository implementation is provided externally.
    this.authRepository = authRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    return await this.authRepository.login({
      email,
      password,
    });
  }
}
