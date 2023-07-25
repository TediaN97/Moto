package com.motowiki.moto.config;

import com.motowiki.moto.repositories.token.TokenRepository;
import com.motowiki.moto.repositories.user.UserRepository;
import com.motowiki.moto.services.AuthenticationService;
import com.motowiki.moto.services.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class TestConfig {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    public TestConfig(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder, @Lazy JwtService jwtService, @Lazy AuthenticationManager authenticationManager, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    @Bean
    public JwtService jwtService() {
        return new JwtService();
    }

    @Bean AuthenticationManager authenticationManager() {
        return new AuthenticationManager() {
            @Override
            public Authentication authenticate(Authentication authentication) throws AuthenticationException {
                return null;
            }
        };
    }

    @Bean
    public AuthenticationService authenticationService() {
        return new AuthenticationService(userRepository, passwordEncoder, jwtService, authenticationManager, tokenRepository);
    }



    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}