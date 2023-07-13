package com.motowiki.moto.services;

import com.motowiki.moto.repositories.car.CarRepository;
import com.motowiki.moto.repositories.car.CarRepositoryImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

class CarServiceTest {

    @Mock
    private CarRepository carRepository;
    private CarRepositoryImpl repositoryImpl;
    private AutoCloseable autoCloseable;
    private CarService underTest;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new CarService(carRepository, repositoryImpl);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    @Disabled
    void create() {
    }

    @Test
    @Disabled
    void findById() {
    }

    @Test
    @Disabled
    void findByBrand() {

    }

    @Test
    @Disabled
    void canGetFindAll() {
        underTest.findAll();
        verify(carRepository).findAll();
    }

    @Test
    @Disabled
    void updateOne() {
    }

    @Test
    @Disabled
    void patchOne() {
    }

    @Test
    @Disabled
    void deleteById() {
    }

    @Test
    @Disabled
    void deleteAll() {
    }
}