package com.motowiki.moto.controllers;

import com.motowiki.moto.models.AuthenticationRequest;
import com.motowiki.moto.models.AuthenticationResponse;
import com.motowiki.moto.models.RegisterRequest;
import com.motowiki.moto.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/get")
    public ResponseEntity<String> get() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }
}
