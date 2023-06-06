package com.motowiki.moto.controllers;

import com.github.fge.jsonpatch.JsonPatch;
import com.motowiki.moto.entities.Engine;
import com.motowiki.moto.entities.Model;
import com.motowiki.moto.models.EngineModel;
import com.motowiki.moto.models.ModelModel;
import com.motowiki.moto.services.EngineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/engine")
public class EngineController {
    private final EngineService service;

    public EngineController(EngineService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<Engine> createProduct(@RequestBody EngineModel engine) throws Exception {
        return new ResponseEntity<>(service.create(engine), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Engine> getOneProduct(@PathVariable("id") int id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Engine>> getAllProducts() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Engine> updateOneProduct(@PathVariable("id") long id, @RequestBody EngineModel engine) throws Exception {
        return new ResponseEntity<>(service.updateOne(id, engine), HttpStatus.OK);
    }

    @PatchMapping(value = "/patch/{id}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Engine> patchOneProduct(@PathVariable("id") int id, @RequestBody JsonPatch patch) {
        return new ResponseEntity<>(service.patchOne(id, patch),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOneProduct(@PathVariable("id") int id) {
        service.deleteById(id);
    }

    @DeleteMapping("/delete/all")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAllProducts() {
        service.deleteAll();
    }
}
