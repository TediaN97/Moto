package com.motowiki.moto.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.motowiki.moto.helper.SaveImageToByte;
import com.motowiki.moto.models.CarModel;
import com.motowiki.moto.entities.Car;
import com.motowiki.moto.repositories.car.CarRepository;
import com.motowiki.moto.repositories.car.CarRepositoryImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CarService {
    private final CarRepository repository;
    private final CarRepositoryImpl repositoryImpl;

    public CarService(CarRepository repository, CarRepositoryImpl repositoryImpl) {
        this.repository = repository;
        this.repositoryImpl = repositoryImpl;
    }

    public Car create(CarModel car) throws Exception {
        Car existsBrand = this.repository.findByBrand(car.getBrand());
        if (existsBrand != null) {
            throw new Exception("Car with this brand is already in a table");
        }

        byte[] logoBytes = null;
        if (car.getLogo() != null && !car.getLogo().isEmpty()) {
            logoBytes = Base64.getDecoder().decode(car.getLogo());
        }

        Car carToSave = Car.builder()
                .brand(car.getBrand())
                .country(car.getCountry())
                .start_from(car.getStart_from())
                .logo(logoBytes)
                .build();

        return repository.save(carToSave);
    }

    public Car findById(long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Car findByBrand(String brand) {
        return repository.findByBrand(brand);
    }

    public List<Car> findAll() {
        return repository.findAll().stream().sorted(Comparator.comparing(Car::getId)).toList();
    }

    public Car updateOne(long id, CarModel car) throws Exception {
        if (repository.findById(id).isEmpty()) throw new EntityNotFoundException();
        Car existsBrand = this.repository.findByBrand(car.getBrand());
        if (existsBrand != null) {
            throw new Exception("Car with this brand is already in a table");
        }

        byte[] logoBytes = null;
        if (car.getLogo() != null && !car.getLogo().isEmpty()) {
            logoBytes = Base64.getDecoder().decode(car.getLogo());
        }

        Car carById = repository.findById(id).get();
        carById.setBrand(car.getBrand());
        carById.setCountry(car.getCountry());
        carById.setStart_from(car.getStart_from());
        carById.setLogo(logoBytes);

        return repository.save(carById);
    }
    public void deleteById(long id) {
        repository.deleteById(id);
    }


    public void deleteAll() {
        repository.deleteAll();
        if(repositoryImpl != null) {
            repositoryImpl.resetPrimaryKey();
        }
    }
}
