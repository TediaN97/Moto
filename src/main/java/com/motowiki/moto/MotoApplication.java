package com.motowiki.moto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class MotoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MotoApplication.class, args);
	}

}
