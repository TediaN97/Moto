package com.motowiki.moto.controllers;

import com.motowiki.moto.models.CarModel;
import com.motowiki.moto.entities.Car;
import com.motowiki.moto.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/car")
public class CarController {
    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<Car> createProduct(@RequestBody CarModel car) throws Exception {
        return new ResponseEntity<>(service.create(car), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getOneProduct(@PathVariable("id") int id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @GetMapping("/models/{brand}")
    public ResponseEntity<Car> getCarByBrand(@PathVariable("brand") String brand) {
        return new ResponseEntity<>(service.findByBrand(brand), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Car>> getAllProducts() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CompletableFuture<Car> updateOneProduct(@PathVariable("id") long id, @RequestBody CarModel car) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return service.updateOne(id, car);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> deleteOneProduct(@PathVariable("id") int id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/all")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAllProducts() {
        service.deleteAll();
    }

}
