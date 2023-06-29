package com.motowiki.moto.controllers;

import com.github.fge.jsonpatch.JsonPatch;
import com.motowiki.moto.entities.Car;
import com.motowiki.moto.entities.Model;
import com.motowiki.moto.models.ModelModel;
import com.motowiki.moto.services.ModelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/model")
public class ModelController {
    private final ModelService service;

    public ModelController(ModelService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<Model> createProduct(@RequestBody ModelModel model) throws Exception {
        return new ResponseEntity<>(service.create(model), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Model> getOneProduct(@PathVariable("id") int id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @GetMapping("{carId}/list")
    public ResponseEntity<List<Model>> getAllProducts(@PathVariable("carId") int car_id) {
        return new ResponseEntity<>(service.findAllById(car_id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Model> updateOneProduct(@PathVariable("id") long id, @RequestBody ModelModel model) throws Exception {
        return new ResponseEntity<>(service.updateOne(id,model), HttpStatus.OK);
    }

    @PatchMapping(value = "/patch/{id}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Model> patchOneProduct(@PathVariable("id") int id, @RequestBody JsonPatch patch) {
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
