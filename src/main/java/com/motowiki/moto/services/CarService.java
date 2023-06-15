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
        List<Car> listOfCars = findAll();
        for(Car checkCar : listOfCars) {
            if (Objects.equals(car.getBrand(), checkCar.getBrand())) {
                throw new Exception("Car with this brand is already in a table");
            }
        }

        byte[] logoBytes = Base64.getDecoder().decode(car.getLogo());

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

    public List<Car> findAll() {
        return repository.findAll().stream().sorted(Comparator.comparing(Car::getId)).toList();
    }

    public void updateOne(long id, CarModel car) throws Exception {
        if (repository.findById(id).isEmpty()) throw new EntityNotFoundException();
        List<Car> listOfCars = findAll();
        for(Car checkCar : listOfCars){
            System.out.println("checkCar" + checkCar);
            System.out.println("id" + id);
            if(Objects.equals(car.getBrand(), checkCar.getBrand()) && checkCar.getId() != id){
                throw new Exception("Car with this brand is already in a table");
            }
        }

        byte[] logoBytes = Base64.getDecoder().decode(car.getLogo());

        repository.updateById(car.getBrand(), car.getCountry(), car.getStart_from(), logoBytes, id);
    }

    public Car patchOne(long id, JsonPatch patch) {
        Car car = repository.findById(id).orElseThrow(EntityNotFoundException::new);
        Car carPatched = applyPatchToProduct(patch, car);
        return repository.save(carPatched);
    }

    public void deleteById(long id) {
        repository.deleteById(id);
    }


    public void deleteAll() {
        repository.deleteAll();
        repositoryImpl.resetPrimaryKey();
    }

    private Car applyPatchToProduct(JsonPatch patch, Car car) {
        try {
            var objectMapper = new ObjectMapper();
            JsonNode patched = patch.apply(objectMapper.convertValue(car, JsonNode.class));
            return objectMapper.treeToValue(patched, Car.class);
        } catch (JsonPatchException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
