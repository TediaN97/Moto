package com.motowiki.moto;

import com.motowiki.moto.models.RegisterRequest;
import com.motowiki.moto.services.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.motowiki.moto.enumerations.Role.ADMIN;

@SpringBootApplication(scanBasePackages = "com.motowiki")
public class MotoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MotoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(AuthenticationService authenticationService) {
		return args -> {
			var admin = RegisterRequest.builder()
					.firstname("Matúš")
					.lastname("Sabat")
					.email("matus.sabat@gmail.com")
					.password("123456789")
					.role(ADMIN)
					.build();
			System.out.println("Admin token: " + authenticationService.register(admin).getAccessToken());
		};
	}

}
